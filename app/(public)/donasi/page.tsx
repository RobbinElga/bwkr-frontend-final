import type { Metadata } from "next";
import { Container } from "@/components/layout/Container";
import {
    getBankAccounts,
    getPrograms,
    getProjects,
    getProjectBySlug,
    getProgramBySlug,
} from "@/services/public";
import { DonationForm } from "@/components/donation/DonationForm";

export const metadata: Metadata = {
    title: "Wakaf Tunai | BWKR",
    description: "Tunaikan wakaf Anda dengan mudah, aman, dan transparan.",
};

type Props = { searchParams: Promise<{ project?: string; program?: string }> };

export default async function DonasiPage({ searchParams }: Props) {
    const { project, program } = await searchParams;

    const [banks, programs, projects, proj, prog] = await Promise.all([
        getBankAccounts(),
        getPrograms(),
        getProjects(),
        project ? getProjectBySlug(project) : Promise.resolve(null),
        program ? getProgramBySlug(program) : Promise.resolve(null),
    ]);

    return (
        <main className="pb-20 pt-28">
            <Container>
                <DonationForm
                    programs={programs}
                    projects={projects}
                    banks={banks}
                    initialProgramId={proj?.program_id ?? prog?.id ?? null}
                    initialProjectId={proj?.id ?? null}
                />
            </Container>
        </main>
    );
}