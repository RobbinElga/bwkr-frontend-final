export interface Program {
    id: number;
    name: string;
    slug: string;
    description: string | null;
    image_url: string | null;
    status: string;
    order: number;
    created_at: string;
}

export interface Project {
    id: number;
    program_id: number;
    program?: Program | null;
    name: string;
    slug: string;
    description: string | null;
    image_urls: string[];
    target_amount: number;
    amount_raised: number;
    amount_spent: number;
    progress_percent: number;
    shortfall: number;
    remaining_funds: number;
    status: string;
    created_at: string;
    start_date: string | null;
    end_date: string | null;
    updates?: ProjectUpdate[];
    bank_accounts?: BankAccount[];
}

export interface NewsItem {
    id: number;
    title: string;
    slug: string;
    content: string | null;
    featured_image_url: string | null;
    author: string | null;
    category: string | null;
    tags: string[];
    meta_desc: string | null;
    status: string;
    published_at: string | null;
    likes_count?: number;
}

export interface Partner {
    id: number;
    name: string;
    logo_url: string | null;
}

export interface Testimonial {
    id: number;
    name: string;
    title: string | null;
    photo_url: string | null;
    content: string;
    order: number;
}

export interface ImpactVideo {
    id: number;
    youtube_url: string;
    youtube_id: string | null;
    caption: string | null;
}

export interface Achievement {
    id: number;
    image_url: string | null;
    count: number;
    label: string;
    period: string | null;
    order: number;
}

export interface ProjectUpdate {
    id: number;
    project_id: number;
    title: string;
    content: string | null;
    image_urls: string[];
    published_at: string | null;
    order: number;
}

export type BankAccountType = "bank" | "qris";

export interface BankAccount {
    id: number;
    type: BankAccountType;
    bank_name: string;
    account_number: string | null;
    account_name: string | null;
    logo_url: string | null;
    qris_image_url: string | null;
    is_active: boolean;
}

// ===== Auth & Donatur =====
export interface AuthUser {
    id: number;
    name: string;
    email: string;
    phone: string | null;
    role: string;
    avatar_url?: string | null;
    is_active?: boolean;
    two_factor_enabled?: boolean;
    created_at?: string;
}

export interface DonationHistoryItem {
    ref_no: string;
    donor_name: string;
    amount: number;
    on_behalf: string | null;
    message: string | null;
    status: "pending" | "claimed" | "rejected";
    source: string;
    project: { name: string; slug: string } | null;
    program: { name: string } | null;
    bank_account: BankAccount | null;
    donation_date: string | null;
    created_at: string;
}

export interface DonorSummary {
    total_verified: number;
    count_verified: number;
    count_all: number;
    projects_supported: number;
}
export interface Paginated<T> {
    data: T[];
    meta: { current_page: number; last_page: number; total: number; per_page: number };
}

export interface ReportItem {
    id: number;
    title: string;
    slug: string;
    category: "tahunan" | "keuangan" | "program";
    year: number | null;
    description: string | null;
    cover_url: string | null;
    file_url: string | null;
    is_published?: boolean;
    order?: number;
    created_at?: string;
}
