import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/teacher-list")({
  head: () => ({ meta: [{ title: "Teacher List — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Teacher List" subtitle="Our faculty across all four divisions.">
      <DataTable
        headers={["Name", "Subject", "Division", "Email"]}
        rows={[
          ["Mr. Daniel Tadesse", "Mathematics", "High School", "d.tadesse@zegainternational.school"],
          ["Ms. Hanna Wolde", "English Literature", "Middle School", "h.wolde@zegainternational.school"],
          ["Mr. Samuel Asfaw", "Sciences", "High School", "s.asfaw@zegainternational.school"],
          ["Ms. Selam Mengistu", "Primary Class Teacher", "Primary", "s.mengistu@zegainternational.school"],
          ["Ms. Eden Tesfaye", "Early Years Lead", "Early Years", "e.tesfaye@zegainternational.school"],
        ]}
      />
    </PortalPageShell>
  ),
});
