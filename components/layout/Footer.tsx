import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import type { SiteSettings } from "@/services/public";

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

export function Footer({ settings = {} }: { settings?: SiteSettings }) {
    const logo = settings.site_logo ?? null;
    const siteName = settings.site_name || "BWKR";
    const tagline =
        settings.footer_tagline ||
        "Platform wakaf digital modern yang menghubungkan kebaikan dengan kebutuhan umat secara transparan dan amanah.";

    return (
        <footer className="border-t border-border-subtle bg-surface-container-lowest">
            <Container className="grid grid-cols-1 gap-6 py-8 md:grid-cols-4">
                <div className="flex flex-col gap-6">
                    {logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={logo} alt={siteName} className="h-16 w-auto object-contain self-start" />
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