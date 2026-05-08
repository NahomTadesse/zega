import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/exam-routine")({
  head: () => ({ meta: [{ title: "Exam Routine — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Exam Routine" subtitle="Upcoming end-of-term examination schedule.">
      <DataTable
        headers={["Date", "Subject", "Time", "Room"]}
        rows={[
          ["Mon, Dec 8", "Mathematics", "09:00 – 11:00", "Hall A"],
          ["Tue, Dec 9", "English", "09:00 – 11:00", "Hall A"],
          ["Wed, Dec 10", "Sciences", "09:00 – 11:30", "Hall B"],
          ["Thu, Dec 11", "Humanities", "09:00 – 11:00", "Hall A"],
          ["Fri, Dec 12", "ICT / Languages", "09:00 – 11:00", "Lab 1"],
        ]}
      />
    </PortalPageShell>
  ),
});
