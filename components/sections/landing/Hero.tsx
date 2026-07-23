"use client";

import Link from "next/link";
import { motion, useReducedMotion, useMotionValue, useMotionTemplate } from "framer-motion";
import { Container } from "@/components/layout/Container";

export function Hero({ settings = {} }: { settings?: Record<string, string | null> }) {
    const reduce = useReducedMotion();

    const title = settings.hero_title || "Membangun Masa Depan Umat Melalui Wakaf Pesantren";
    const sub = settings.hero_subtitle || "Membantu ribuan santri mendapatkan fasilitas pendidikan yang layak demi melahirkan generasi rabbani yang berdaya.";
    const ctaText = settings.hero_cta_text || "Wakaf Sekarang";
    const ctaLink = settings.hero_cta_link || "/donasi";
    const heroImg = settings.hero_image || null;

    // glow mengikuti kursor — pakai motion value, TIDAK memicu re-render
    const mx = useMotionValue(30);
    const my = useMotionValue(22);
    const glow = useMotionTemplate`radial-gradient(circle at ${mx}% ${my}%, rgba(146,211,192,0.30), transparent 60%)`;

    function onMove(e: React.MouseEvent<HTMLElement>) {
        const r = e.currentTarget.getBoundingClientRect();
        mx.set(((e.clientX - r.left) / r.width) * 100);
        my.set(((e.clientY - r.top) / r.height) * 100);
    }

    return (
        <section
            onMouseMove={reduce ? undefined : onMove}
            className="relative flex min-h-[600px] items-center overflow-hidden bg-deep-forest pt-20 md:min-h-[720px]"
        >
            <div className="absolute inset-0 bg-gradient-to-t from-deep-forest via-deep-forest/90 to-primary/40" />
            {heroImg && (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={heroImg} alt="" aria-hidden className="absolute inset-0 h-full w-full object-cover opacity-20" />
            )}
            <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glow }} />

            <Container className="relative z-10">
                <div className="mx-auto max-w-3xl text-center">
                    <h1 className="text-display-lg-mobile text-white md:text-display-lg">
                        {title}
                    </h1>
                    <p className="mx-auto mt-6 max-w-2xl text-body-lg text-on-primary-container">
                        {sub}
                    </p>
                    <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
                        <Link href={ctaLink} className="rounded-xl bg-primary-container px-10 py-4 text-label-md text-on-primary-container transition-all hover:scale-[1.03] hover:bg-primary active:scale-95">
                            {ctaText}
                        </Link>
                        <Link href="/#dampak" className="rounded-xl border border-white/20 bg-white/10 px-10 py-4 text-label-md text-white transition-all hover:bg-white/20">
                            Lihat Dampak
                        </Link>
                    </div>
                </div>
            </Container>
        </section>
    );
}