# Digital Library SMAN 1 Bukittinggi

Website perpustakaan sekolah untuk menemukan koleksi buku, membaca terbitan digital, dan mengajukan reservasi.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)

## Where things live

- `artifacts/digital-library-smansa` — React + Vite public library experience.
- `artifacts/api-server/src/routes/library.ts` — catalog, stats, magazine, and reservation handlers.
- `lib/api-spec/openapi.yaml` — source of truth for public API contracts.
- `lib/db/src/schema` — Drizzle tables for books, magazines, and reservations.
- `artifacts/digital-library-smansa/src/index.css` — visual tokens and global styling.

## Architecture decisions

- The catalog is the primary experience; public browsing does not require authentication.
- API contracts are defined in OpenAPI first, then generated client hooks are used by the frontend.
- Reservation submissions are persisted in PostgreSQL and return a user-visible success state.
- The UI uses a warm editorial library direction rather than an admin dashboard pattern.

## Product

- Homepage discovery with search, library counts, popular books, and digital magazine highlights.
- Searchable and filterable catalog with availability status and book detail pages.
- Reservation dialog with name, NIS, and class fields.
- Magazine archive, library information, and contact pages.

## User preferences

- Keep the experience authored and human-feeling; avoid generic or visibly AI-generated UI patterns.

## Gotchas

- Regenerate the API client after changing `lib/api-spec/openapi.yaml`.
- Artifact workflows provide `PORT` and `BASE_PATH`; do not run the Vite app with a hand-written root command.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
