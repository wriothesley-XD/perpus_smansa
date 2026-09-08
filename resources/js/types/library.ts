export interface Author {
    id: number;
    name: string;
    slug: string;
    bio?: string | null;
}

export interface Category {
    id: number;
    name: string;
    slug: string;
    description?: string | null;
    icon?: string | null;
    books_count?: number;
}

export interface Publisher {
    id: number;
    name: string;
    slug: string;
    city?: string | null;
}

export interface DdcClass {
    id: number;
    code: string;
    name: string;
    description?: string | null;
}

export interface BookCopy {
    id: number;
    book_id: number;
    barcode_identifier: string;
    status: 'available' | 'reserved' | 'on_loan' | 'maintenance' | 'lost';
    condition_notes?: string | null;
    shelf_location?: string | null;
}

export interface Book {
    id: number;
    title: string;
    slug: string;
    category_id: number;
    publisher_id: number;
    ddc_class_id: number;
    publication_year: number;
    isbn: string;
    language: string;
    synopsis: string;
    shelf_location: string;
    cover_image: string;
    popularity: number;
    category?: Category;
    publisher?: Publisher;
    ddc_class?: DdcClass;
    authors?: Author[];
    copies?: BookCopy[];
    copies_count?: number;
    available_copies_count?: number;
    is_available?: boolean;
    created_at: string;
    updated_at: string;
}

export interface Reservation {
    id: number;
    user_id?: number | null;
    book_id: number;
    reservation_code: string;
    guest_name?: string | null;
    guest_nis?: string | null;
    guest_class?: string | null;
    status: 'pending' | 'ready_for_pickup' | 'completed' | 'cancelled' | 'expired';
    expires_at: string;
    notes?: string | null;
    book?: Book;
    created_at: string;
}

export interface Loan {
    id: number;
    loan_code: string;
    user_id: number;
    book_copy_id: number;
    reservation_id?: number | null;
    librarian_id: number;
    borrowed_at: string;
    due_at: string;
    returned_at?: string | null;
    status: 'active' | 'returned' | 'overdue';
    notes?: string | null;
    book_copy?: BookCopy & { book?: Book };
    created_at: string;
}

export interface MagazineEdition {
    id: number;
    magazine_id: number;
    edition_title: string;
    edition_number: string;
    publication_date: string;
    year: number;
    cover_image: string;
    pdf_file_path: string;
    description?: string | null;
    page_count?: number;
}

export interface Magazine {
    id: number;
    title: string;
    slug: string;
    description: string;
    cover_image: string;
    editions?: MagazineEdition[];
    latest_edition?: MagazineEdition;
}

export interface LibraryStats {
    total_books: number;
    available_books: number;
    total_authors: number;
    total_categories: number;
    total_loans?: number;
    active_members?: number;
}

export interface PaginatedResponse<T> {
    data: T[];
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
    links: {
        url: string | null;
        label: string;
        active: boolean;
    }[];
}
