import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell } from "@/components/site/PortalPageShell";
import { Download, FileText } from "lucide-react";

const forms = [
  { name: "Admission Application Form", size: "PDF · 220 KB" },
  { name: "Medical Information Form", size: "PDF · 180 KB" },
  { name: "Student Code of Conduct", size: "PDF · 320 KB" },
  { name: "Transport Request Form", size: "PDF · 140 KB" },
  { name: "Withdrawal / Transfer Form", size: "PDF · 160 KB" },
  { name: "Field Trip Consent Form", size: "PDF · 120 KB" },
];

export const Route = createFileRoute("/portal/form-download")({
  head: () => ({ meta: [{ title: "Form Download — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Form Download" subtitle="Download the most commonly requested school forms.">
      <ul className="grid gap-3 sm:grid-cols-2">
        {forms.map((f) => (
          <li key={f.name} className="bg-card border border-border rounded-lg p-4 flex items-center gap-4">
            <div className="h-10 w-10 rounded-md bg-secondary text-primary grid place-items-center"><FileText className="h-5 w-5" /></div>
            <div className="flex-1 min-w-0">
              <div className="font-semibold text-sm truncate">{f.name}</div>
              <div className="text-xs text-muted-foreground">{f.size}</div>
            </div>
            <a href="#" className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-2 rounded-md bg-accent text-accent-foreground"><Download className="h-3.5 w-3.5" /> Download</a>
          </li>
        ))}
      </ul>
    </PortalPageShell>
  ),
});
