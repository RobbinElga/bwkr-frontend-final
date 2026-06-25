import { safeFetch } from "@/lib/server-api";
import type {
    Program, Project, NewsItem, Partner, Testimonial, ImpactVideo, Achievement,
    BankAccount, ReportItem
} from "@/types";

export const getPrograms = () => safeFetch<Program[]>("/programs", []);
export const getProjects = () => safeFetch<Project[]>("/projects", []);
export const getNews = () => safeFetch<NewsItem[]>("/news", []);
export const getPartners = () => safeFetch<Partner[]>("/partners", []);
export const getTestimonials = () => safeFetch<Testimonial[]>("/testimonials", []);
export const getImpactVideos = () => safeFetch<ImpactVideo[]>("/impact-videos", []);
export const getAchievements = () => safeFetch<Achievement[]>("/achievements", []);
export async function getNewsBySlug(slug: string) {
    return safeFetch<NewsItem | null>(`/news/${slug}`, null);
}
export async function getProgramBySlug(slug: string) {
    return safeFetch<Program | null>(`/programs/${slug}`, null);
}
export async function getProjectBySlug(slug: string) {
    return safeFetch<Project | null>(`/projects/${slug}`, null);
}
export async function getBankAccounts() {
    return safeFetch<BankAccount[]>("/bank-accounts", []);
}

export async function getReports(): Promise<ReportItem[]> {
    return safeFetch<ReportItem[]>("/reports", []);
}

export type SiteSettings = Record<string, string | null>;
export const getSiteSettings = () => safeFetch<SiteSettings>("/settings", {});

export interface ProjectDonor { name: string; amount: number; date: string | null; }
export const getProjectDonors = (slug: string) =>
    safeFetch<ProjectDonor[]>(`/projects/${slug}/donors`, []);