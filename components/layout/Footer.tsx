"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";

const API = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000/api/v1";

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
    return (
        <div>
            <h4 className="mb-6 text-headline-md text-primary">{title}</h4>
            <ul className="flex flex-col gap-3">
                {links.map(([label, href]) => (
                    <li key={label}>
                        <Link href={href} className="text-label-md text-on-surface-variant transition-colors hover:text-secondary">
                            {label}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer() {
    const [logo, setLogo] = useState<string | null>(null);
    const [siteName, setSiteName] = useState("BWKR");
    const [tagline, setTagline] = useState(
        "Platform wakaf digital modern yang menghubungkan kebaikan dengan kebutuhan umat secara transparan dan amanah."
    );

    useEffect(() => {
        fetch(`${API}/settings`, { headers: { Accept: "application/json" } })
            .then((r) => (r.ok ? r.json() : null))
            .then((b) => {
                if (!b?.data) return;
                if (b.data.site_logo) setLogo(b.data.site_logo);
                if (b.data.site_name) setSiteName(b.data.site_name);
                if (b.data.footer_tagline) setTagline(b.data.footer_tagline);
            })
            .catch(() => { });
    }, []);

    return (
        <footer className="border-t border-border-subtle bg-surface-container-lowest">
            <Container className="grid grid-cols-1 gap-6 py-8 md:grid-cols-4">
                <div className="flex flex-col gap-6">
                    {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt={siteName} className="h-12 w-auto object-contain self-start" />
                    ) : (
                        <span className="text-headline-md font-bold text-primary">{siteName}</span>
                    )}
                    <p className="text-body-md text-on-surface-variant">{tagline}</p>
                </div>
                <FooterCol title="Program" links={[["Wakaf Al-Qur'an", "/program"], ["Air Bersih", "/program"], ["Pendidikan", "/program"]]} />
                <FooterCol title="Navigasi" links={[["Tentang Kami", "/tentang"], ["Dampak", "/#dampak"], ["Project", "/project"], ["Berita", "/berita"]]} />
                <FooterCol title="Informasi" links={[["Syarat & Ketentuan", "#"], ["Kebijakan Privasi", "#"], ["Hubungi Kami", "#"]]} />
            </Container>
            <Container className="flex flex-col items-center justify-between gap-4 border-t border-border-subtle py-8 md:flex-row">
                <p className="text-label-sm text-on-surface-variant">
                    © {new Date().getFullYear()} {siteName} Islamic Waqf Platform. All Rights Reserved.
                </p>
                <div className="flex gap-4 text-on-surface-variant">
                    <Icon name="share" className="cursor-pointer hover:text-primary" />
                    <Icon name="mail" className="cursor-pointer hover:text-primary" />
                </div>
            </Container>
        </footer>
    );
}