import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Fab } from "@/components/layout/Fab";
import { BottomNav } from "@/components/layout/BottomNav";
import { LandingSplash } from "@/components/ui/LandingSplash";
import { getSiteSettings } from "@/services/public";

export default async function PublicLayout({ children }: { children: React.ReactNode }) {
    const settings = await getSiteSettings();

    return (
        <>
            <LandingSplash />
            <Header settings={settings} />
            {children}
            <Footer settings={settings} />
            <Fab />
            <BottomNav />
        </>
    );
}