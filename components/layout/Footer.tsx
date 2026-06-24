import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";

function FooterCol({ title, links }: { title: string; links: [string, string][] }) {
    return (
        <div>
            <h4 className="mb-6 text-headline-md text-primary">{title}</h4>
            <ul className="flex flex-col gap-3">
                {links.map(([label, href]) => (
                    <li key={label}>
                        <Link href={href} className="text-label-md text-on-surface-variant transition-colors hover:text-secondary">{label}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export function Footer({ settings = {} }: { settings?: Record<string, string | null> }) {
    const name = settings.site_name || "BWKR";
    const tagline = settings.footer_tagline || "Platform wakaf digital modern yang menghubungkan kebaikan dengan kebutuhan umat secara transparan dan amanah.";
    const socials: [string, string | null, string][] = [
        ["photo_camera", settings.social_instagram, "Instagram"],
        ["thumb_up", settings.social_facebook, "Facebook"],
        ["smart_display", settings.social_youtube, "YouTube"],
    ];

    return (
        <footer className="border-t border-border-subtle bg-surface-container-lowest">
            <Container className="grid grid-cols-1 gap-6 py-8 md:grid-cols-4">
                <div className="flex flex-col gap-6">
                    {settings.site_logo ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={settings.site_logo} alt={name} className="h-9 w-auto self-start" />
                    ) : (
                        <span className="text-headline-md font-bold text-primary">{name}</span>
                    )}
                    <p className="text-body-md text-on-surface-variant">{tagline}</p>
                    {(settings.contact_email || settings.contact_phone) && (
                        <div className="flex flex-col gap-1 text-label-md text-on-surface-variant">
                            {settings.contact_email && <span className="flex items-center gap-2"><Icon name="mail" className="text-[18px]" /> {settings.contact_email}</span>}
                            {settings.contact_phone && <span className="flex items-center gap-2"><Icon name="call" className="text-[18px]" /> {settings.contact_phone}</span>}
                        </div>
                    )}
                </div>
                <FooterCol title="Program" links={[["Wakaf Al-Qur'an", "/program"], ["Air Bersih", "/program"], ["Pendidikan", "/program"]]} />
                <FooterCol title="Navigasi" links={[["Tentang Kami", "/tentang"], ["Dampak", "/#dampak"], ["Project", "/project"], ["Berita", "/berita"]]} />
                <FooterCol title="Informasi" links={[["Cek Status Donasi", "/cek-status"], ["Syarat & Ketentuan", "#"], ["Hubungi Kami", "#"]]} />
            </Container>
            <Container className="flex flex-col items-center justify-between gap-4 border-t border-border-subtle py-8 md:flex-row">
                <p className="text-label-sm text-on-surface-variant">© {new Date().getFullYear()} {name} Islamic Waqf Platform. All Rights Reserved.</p>
                <div className="flex gap-3 text-on-surface-variant">
                    {socials.filter(([, url]) => url).map(([icon, url, label]) => (
                        <a key={label} href={url!} target="_blank" rel="noopener noreferrer" aria-label={label} className="hover:text-primary">
                            <Icon name={icon} />
                        </a>
                    ))}
                </div>
            </Container>
        </footer>
    );
}