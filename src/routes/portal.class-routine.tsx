import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/class-routine")({
  head: () => ({ meta: [{ title: "Class Routine — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Class Routine" subtitle="Weekly class schedule (sample for Grade 9).">
      <DataTable
        headers={["Time", "Mon", "Tue", "Wed", "Thu", "Fri"]}
        rows={[
          ["08:00 – 08:45", "Math", "English", "Science", "Math", "Humanities"],
          ["08:50 – 09:35", "Science", "Math", "English", "ICT", "English"],
          ["09:40 – 10:25", "Amharic", "Science", "Math", "Science", "PE"],
          ["10:45 – 11:30", "Humanities", "Art", "Humanities", "English", "Math"],
          ["11:35 – 12:20", "ICT", "PE", "Music", "Amharic", "Science"],
        ]}
      />
    </PortalPageShell>
  ),
});
