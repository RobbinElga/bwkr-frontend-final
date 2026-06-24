import {
    getPrograms, getProjects, getAchievements,
    getImpactVideos, getPartners, getTestimonials, getNews,
} from "@/services/public";
import { ProgramsSection } from "./ProgramsSection";
import { ProjectsSection } from "./ProjectsSection";
import { AchievementsSection } from "./AchievementsSection";
import { DampakSection } from "./DampakSection";
import { PartnersSection } from "./PartnersSection";
import { TestimonialsSection } from "./TestimonialsSection";
import { NewsSection } from "./NewsSection";

export async function AsyncPrograms() {
    const programs = await getPrograms();
    return <ProgramsSection programs={programs} />;
}

export async function AsyncProjects() {
    const projects = await getProjects();
    return <ProjectsSection projects={projects} />;
}

export async function AsyncAchievements() {
    const achievements = await getAchievements();
    return <AchievementsSection achievements={achievements} />;
}

export async function AsyncDampak() {
    const videos = await getImpactVideos();
    return <DampakSection videos={videos} />;
}

export async function AsyncPartners() {
    const partners = await getPartners();
    return <PartnersSection partners={partners} />;
}

export async function AsyncTestimonials() {
    const testimonials = await getTestimonials();
    return <TestimonialsSection testimonials={testimonials} />;
}

export async function AsyncNews() {
    const news = await getNews();
    return <NewsSection news={news} />;
}