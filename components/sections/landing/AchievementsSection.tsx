import { Container } from "@/components/layout/Container";
import { CountUp } from "@/components/ui/CountUp";
import type { Achievement } from "@/types";

export function AchievementsSection({ achievements }: { achievements: Achievement[] }) {
    if (achievements.length === 0) return null;

    return (
        <section className="bg-deep-forest py-20 text-white">
            <Container>
                <div className="grid grid-cols-2 gap-12 text-center md:grid-cols-4">
                    {achievements.map((a) => (
                        <div key={a.id} className="flex flex-col gap-2">
                            <span className="text-4xl font-bold md:text-5xl">
                                <CountUp to={a.count} />+
                            </span>
                            <span className="text-label-md uppercase tracking-widest text-primary-fixed">{a.label}</span>
                        </div>
                    ))}
                </div>
            </Container>
        </section>
    );
}