import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/archive")({
  head: () => ({ meta: [{ title: "Archive — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Archive" subtitle="Past academic calendars, newsletters and result summaries.">
      <DataTable
        headers={["Year", "Document", "Type"]}
        rows={[
          ["2024/25", "Academic Calendar 2024/25", "PDF"],
          ["2024/25", "Annual Yearbook 2024/25", "PDF"],
          ["2023/24", "Examination Results Summary", "PDF"],
          ["2023/24", "Annual Newsletter", "PDF"],
          ["2022/23", "Academic Calendar 2022/23", "PDF"],
        ]}
      />
    </PortalPageShell>
  ),
});
