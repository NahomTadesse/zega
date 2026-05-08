import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, DataTable } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/tuition-fees")({
  head: () => ({ meta: [{ title: "Tuition Fees — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Tuition Fees" subtitle="Indicative annual tuition by division for the 2025/26 academic year. Contact admissions for an official fee schedule.">
      <DataTable
        headers={["Division", "Annual Tuition (ETB)", "Payment Plan"]}
        rows={[
          ["Early Years", "On request", "Termly / Annual"],
          ["Primary School", "On request", "Termly / Annual"],
          ["Middle School", "On request", "Termly / Annual"],
          ["High School (IGCSE / A Level)", "On request", "Termly / Annual"],
        ]}
      />
      <p className="mt-6 text-sm text-muted-foreground">
        Additional one-time fees may apply for registration, examinations and learning resources.
        Sibling discounts are available — please speak to the admissions office for details.
      </p>
    </PortalPageShell>
  ),
});
