import { Router, type IRouter } from "express";
import {
  and,
  desc,
  eq,
  gt,
  ilike,
  or,
  sql,
} from "drizzle-orm";
import { db, booksTable, magazinesTable, reservationsTable } from "@workspace/db";
import {
  CreateReservationBody,
  GetBookParams,
  GetBookResponse,
  GetLibraryStatsResponse,
  ListBooksQueryParams,
  ListBooksResponse,
  ListMagazinesResponse,
  CreateReservationResponse,
} from "@workspace/api-zod";

const router: IRouter = Router();

function toBookResponse(book: typeof booksTable.$inferSelect) {
  return {
    id: book.id,
    title: book.title,
    author: book.author,
    category: book.category,
    ddc: book.ddc,
    isbn: book.isbn,
    publisher: book.publisher,
    year: book.year,
    language: book.language,
    synopsis: book.synopsis,
    shelf: book.shelf,
    copies: book.copies,
    availableCopies: book.availableCopies,
    coverUrl: book.coverUrl,
    status: book.availableCopies > 0 ? "available" : "borrowed",
  };
}

router.get("/books", async (req, res): Promise<void> => {
  const parsed = ListBooksQueryParams.safeParse(req.query);
  if (!parsed.success) {
    res.status(400).json({ error: parsed.error.message });
    return;
  }

  const filters = [];
  const { q, category, status, sort } = parsed.data;

  if (q) {
    filters.push(
      or(
        ilike(booksTable.title, `%${q}%`),
        ilike(booksTable.author, `%${q}%`),
        ilike(booksTable.isbn, `%${q}%`),
      ),
    );
  }
  if (category) {
    filters.push(eq(booksTable.category, category));
  }
  if (status === "available") {
    filters.push(gt(booksTable.availableCopies, 0));
  }
  if (status === "borrowed") {
    filters.push(eq(booksTable.availableCopies, 0));
  }

  const books = await db
    .select()
    .from(booksTable)
    .where(filters.length > 0 ? and(...filters) : undefined)
    .orderBy(
      sort === "newest" ? desc(booksTable.year) : desc(booksTable.popularity),
    );

  res.json(ListBooksResponse.parse(books.map(toBookResponse)));
});

router.get("/books/:id", async (req, res): Promise<void> => {
  const params = GetBookParams.safeParse(req.params);
  if (!params.success) {
    res.status(400).json({ error: params.error.message });
    return;
  }

  const [book] = await db
    .select()
    .from(booksTable)
    .where(eq(booksTable.id, params.data.id));

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  res.json(GetBookResponse.parse(toBookResponse(book)));
});

router.get("/library-stats", async (_req, res): Promise<void> => {
  const [summary] = await db
    .select({
      totalBooks: sql<number>`count(*)`,
      totalAuthors: sql<number>`count(distinct ${booksTable.author})`,
      totalCategories: sql<number>`count(distinct ${booksTable.category})`,
      availableBooks: sql<number>`coalesce(sum(${booksTable.availableCopies}), 0)`,
    })
    .from(booksTable);

  res.json(
    GetLibraryStatsResponse.parse({
      totalBooks: Number(summary?.totalBooks ?? 0),
      totalAuthors: Number(summary?.totalAuthors ?? 0),
      totalCategories: Number(summary?.totalCategories ?? 0),
      availableBooks: Number(summary?.availableBooks ?? 0),
    }),
  );
});

router.get("/magazines", async (_req, res): Promise<void> => {
  const magazines = await db
    .select()
    .from(magazinesTable)
    .orderBy(desc(magazinesTable.year), desc(magazinesTable.id));
  res.json(ListMagazinesResponse.parse(magazines));
});

router.post("/reservations", async (req, res): Promise<void> => {
  const body = CreateReservationBody.safeParse(req.body);
  if (!body.success) {
    res.status(400).json({ error: body.error.message });
    return;
  }

  const [book] = await db
    .select({ id: booksTable.id, title: booksTable.title })
    .from(booksTable)
    .where(eq(booksTable.id, body.data.bookId));

  if (!book) {
    res.status(404).json({ error: "Book not found" });
    return;
  }

  const [reservation] = await db
    .insert(reservationsTable)
    .values({
      ...body.data,
      bookTitle: book.title,
      status: "pending",
    })
    .returning();

  res.status(201).json(CreateReservationResponse.parse(reservation));
});

export default router;