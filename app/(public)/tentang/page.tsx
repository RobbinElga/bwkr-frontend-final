import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/layout/Container";
import { Icon } from "@/components/ui/Icon";
import { getSiteSettings } from "@/services/public";

export const metadata: Metadata = {
    title: "Tentang Kami | BWKR",
    description:
        "Badan Wakaf Khulafaur Rasyidin (BWKR) — lembaga wakaf produktif Pondok Pesantren Khulafaur Rasyidin yang amanah, transparan, dan berdampak nyata bagi umat.",
};

const values = [
    { icon: "verified_user", title: "Amanah", desc: "Setiap dana wakaf dikelola sesuai syariat dan peruntukannya, dengan pengawasan ketat." },
    { icon: "monitoring", title: "Transparan", desc: "Progres penghimpunan dan penyaluran dapat dipantau secara real-time oleh para wakif." },
    { icon: "diversity_3", title: "Berdampak", desc: "Fokus pada wakaf produktif yang manfaatnya terus mengalir untuk generasi mendatang." },
];

export default async function TentangPage() {
    const settings = await getSiteSettings();

    const intro = settings.about_intro || "Badan Wakaf Khulafaur Rasyidin (BWKR) adalah lembaga pengelola wakaf produktif di bawah Pondok Pesantren Khulafaur Rasyidin, hadir untuk menghubungkan kebaikan para wakif dengan kebutuhan nyata umat secara modern dan transparan.";
    const vision = settings.about_vision || "Mewujudkan kemandirian pesantren dan kesejahteraan umat melalui pengelolaan wakaf produktif.";
    const mission = settings.about_mission || "Mengelola wakaf secara amanah, transparan, dan berdampak bagi umat.";
    const aboutImg = settings.about_image || null;

    return (
        <main className="pb-20">
            {/* Hero */}
            <section className="bg-deep-forest pb-20 pt-32 text-white">
                <Container>
                    <div className="max-w-3xl">
                        <span className="mb-4 inline-block rounded-full border border-white/20 bg-white/10 px-4 py-1 text-label-md">
                            Tentang Kami
                        </span>
                        <h1 className="text-display-lg-mobile">Mengelola Wakaf dengan Amanah & Teknologi</h1>
                        <p className="mt-6 text-body-lg text-on-primary-container">{intro}</p>
                    </div>
                </Container>
            </section>

            {/* Visi & Misi */}
            <Container className="py-20">
                <div className="grid items-center gap-12 md:grid-cols-2">
                    <div className="space-y-8">
                        <div>
                            <h2 className="mb-4 text-headline-lg text-primary">Visi Kami</h2>
                            <p className="text-body-md text-on-surface-variant">{vision}</p>
                        </div>
                        <div>
                            <h2 className="mb-4 text-headline-lg text-primary">Misi Kami</h2>
                            <p className="text-body-md text-on-surface-variant">{mission}</p>
                        </div>
                    </div>

                    {aboutImg ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={aboutImg} alt="Tentang BWKR" className="w-full rounded-3xl object-cover shadow-glow" />
                    ) : (
                        <div className="rounded-3xl bg-surface-gray p-10">
                            <p className="text-headline-md italic text-primary">
                                &ldquo;Apabila seorang anak Adam meninggal, maka terputuslah amalnya kecuali tiga perkara: sedekah jariyah, ilmu yang bermanfaat, dan anak shalih yang mendoakannya.&rdquo;
                            </p>
                            <p className="mt-4 text-label-md text-on-surface-variant">— HR. Muslim</p>
                        </div>
                    )}
                </div>
            </Container>

            {/* Nilai */}
            <section className="bg-surface-gray py-20">
                <Container>
                    <h2 className="mb-12 text-center text-headline-lg text-primary">Nilai yang Kami Pegang</h2>
                    <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                        {values.map((v) => (
                            <div key={v.title} className="rounded-2xl bg-white p-8 shadow-glow">
                                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-primary-container text-on-primary-container">
                                    <Icon name={v.icon} filled className="text-3xl" />
                                </div>
                                <h3 className="mb-2 text-headline-md text-on-surface">{v.title}</h3>
                                <p className="text-body-md text-on-surface-variant">{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </Container>
            </section>

            {/* CTA */}
            <Container className="pt-20">
                <div className="flex flex-col items-center gap-6 rounded-3xl bg-primary px-8 py-16 text-center text-white">
                    <h2 className="text-headline-lg">Mulai Wakaf Anda Hari Ini</h2>
                    <p className="max-w-xl text-body-md text-on-primary-container">
                        Bergabunglah bersama ribuan wakif yang telah merasakan kemudahan berwakaf secara transparan.
                    </p>
                    <div className="flex flex-col gap-4 sm:flex-row">
                        <Link href="/program" className="rounded-xl bg-white px-10 py-4 text-label-md text-primary transition-all hover:bg-surface-container-low">
                            Lihat Program
                        </Link>
                        <Link href="/donasi" className="rounded-xl border border-white/30 bg-white/10 px-10 py-4 text-label-md text-white transition-all hover:bg-white/20">
                            Wakaf Sekarang
                        </Link>
                    </div>
                </div>
            </Container>
        </main>
    );
}