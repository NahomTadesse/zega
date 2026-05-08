import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/student-list")({
  head: () => ({ meta: [{ title: "Student List — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Student List" subtitle="Active students enrolled in the current academic year (sample data).">
      <DataTable
        headers={["ID", "Name", "Class", "Section", "Status"]}
        rows={[
          ["ZIS-1024", "Liya Bekele", "Grade 6", "A", "Active"],
          ["ZIS-1025", "Yonas Alemu", "Grade 9", "B", "Active"],
          ["ZIS-1026", "Sara Tesfaye", "Year 12", "—", "Active"],
          ["ZIS-1027", "Henok Girma", "Grade 4", "A", "Active"],
          ["ZIS-1028", "Mariam Kedir", "Year 1", "—", "Active"],
        ]}
      />
    </PortalPageShell>
  ),
});
