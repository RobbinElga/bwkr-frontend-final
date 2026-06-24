import { Suspense } from "react";
import type { Metadata } from "next";
import { Hero } from "@/components/sections/landing/Hero";
import {
  AsyncPrograms,
  AsyncProjects,
  AsyncAchievements,
  AsyncDampak,
  AsyncPartners,
  AsyncTestimonials,
  AsyncNews,
} from "@/components/sections/landing/AsyncSections";
import {
  ProgramsSectionSkeleton,
  ProjectsSectionSkeleton,
  AchievementsSectionSkeleton,
  PartnersSectionSkeleton,
  TestimonialsSectionSkeleton,
  NewsSectionSkeleton,
} from "@/components/ui/Skeleton";

import { Reveal } from "@/components/ui/Reveal";
import { getSiteSettings } from "@/services/public";

export const metadata: Metadata = {
  title: "BWKR | Platform Wakaf Digital Amanah & Transparan",
  description:
    "Wakaf produktif untuk pesantren dan umat. Pilih program, pantau progres real-time, dan rasakan dampak nyata bersama BWKR.",
};

export default async function HomePage() {
  const settings = await getSiteSettings();
  return (
    <main>
      <Hero settings={settings} />

      <Suspense fallback={<ProgramsSectionSkeleton />}>
        <Reveal><AsyncPrograms /></Reveal>
      </Suspense>

      <Suspense fallback={<ProjectsSectionSkeleton />}>
        <Reveal> <AsyncProjects /></Reveal>
      </Suspense>

      <Suspense fallback={<AchievementsSectionSkeleton />}>
        <Reveal><AsyncAchievements /></Reveal>
      </Suspense>

      {/* Dampak (YouTube) — tidak ada skeleton khusus, langsung render */}
      <Suspense fallback={<div className="py-20" />}>
        <Reveal><AsyncDampak /></Reveal>
      </Suspense>

      <Suspense fallback={<PartnersSectionSkeleton />}>
        <Reveal><AsyncPartners /></Reveal>
      </Suspense>

      <Suspense fallback={<TestimonialsSectionSkeleton />}>
        <Reveal> <AsyncTestimonials /></Reveal>
      </Suspense>

      <Suspense fallback={<NewsSectionSkeleton />}>
        <Reveal><AsyncNews /></Reveal>
      </Suspense>
    </main>
  );
}