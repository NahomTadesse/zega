import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, StatCard } from "@/components/admin/AdminUI";
import { ConfirmDialog } from "@/components/admin/CrudModal";
import { Check, Eye, X, Search, Download, Inbox, ClipboardCheck } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, toCSV } from "@/lib/admin-csv";

export const Route = createFileRoute("/admin/admissions")({
  component: AdmissionsAdmin,
});

type App = { id: string; name: string; division: string; date: string; contact: string; status: string };

const SEED: App[] = [
  { id: "AP-001", name: "Liya Bekele", division: "Primary", date: "2025-11-06", contact: "+251 91 111 1111", status: "Pending review" },
  { id: "AP-002", name: "Yonas Alemu", division: "High School", date: "2025-11-05", contact: "+251 91 222 2222", status: "Interview scheduled" },
  { id: "AP-003", name: "Sara Tesfaye", division: "Middle School", date: "2025-11-04", contact: "+251 91 333 3333", status: "Offer sent" },
  { id: "AP-004", name: "Henok Girma", division: "Early Years", date: "2025-11-03", contact: "+251 91 444 4444", status: "Enrolled" },
  { id: "AP-005", name: "Mariam Kedir", division: "Primary", date: "2025-11-02", contact: "+251 91 555 5555", status: "Declined" },
];

const tone = (s: string): "success" | "danger" | "info" | "warn" =>
  s === "Enrolled" ? "success" : s === "Declined" ? "danger" : s === "Offer sent" ? "info" : "warn";

const STATUSES = ["Pending review", "Interview scheduled", "Offer sent", "Enrolled", "Declined"];

function AdmissionsAdmin() {
  const [rows, setRows] = useState<App[]>(SEED);
  const [q, setQ] = useState("");
  const [filter, setFilter] = useState("");
  const [viewing, setViewing] = useState<App | null>(null);
  const [confirm, setConfirm] = useState<{ a: App; action: "approve" | "decline" } | null>(null);

  const filtered = useMemo(() => rows.filter((a) =>
    (a.name + a.id + a.division).toLowerCase().includes(q.toLowerCase()) && (filter ? a.status === filter : true)
  ), [rows, q, filter]);

  const stats = useMemo(() => ({
    total: rows.length,
    pending: rows.filter((r) => r.status === "Pending review").length,
    enrolled: rows.filter((r) => r.status === "Enrolled").length,
  }), [rows]);

  const update = (id: string, status: string) => { setRows((p) => p.map((r) => r.id === id ? { ...r, status } : r)); toast.success(`Status: ${status}`); };

  return (
    <div>
      <PageTitle
        title="Admissions"
        subtitle="Review and process applications for the 2025/26 academic year."
        action={<GhostButton onClick={() => { downloadCSV(`admissions-${Date.now()}.csv`, toCSV(rows)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>}
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Applications" value={stats.total} icon={Inbox} tone="primary" />
        <StatCard label="Pending Review" value={stats.pending} icon={ClipboardCheck} tone="accent" />
        <StatCard label="Enrolled" value={stats.enrolled} icon={Check} tone="success" />
      </div>

      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search applicants…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All statuses</option>
            {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <AdminTable
          headers={["ID", "Applicant", "Division", "Submitted", "Contact", "Status", "Actions"]}
          rows={filtered.map((a) => [
            <span className="font-mono text-xs">{a.id}</span>,
            <span className="font-medium">{a.name}</span>,
            a.division, a.date, <span className="text-xs">{a.contact}</span>,
            <Badge tone={tone(a.status)}>{a.status}</Badge>,
            <div className="flex gap-2">
              <button onClick={() => setViewing(a)} className="text-muted-foreground hover:text-primary" title="View"><Eye className="h-4 w-4" /></button>
              <button onClick={() => setConfirm({ a, action: "approve" })} className="text-muted-foreground hover:text-emerald-600" title="Approve"><Check className="h-4 w-4" /></button>
              <button onClick={() => setConfirm({ a, action: "decline" })} className="text-muted-foreground hover:text-destructive" title="Decline"><X className="h-4 w-4" /></button>
            </div>,
          ])}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No applications match.</div>}
      </AdminCard>

      {viewing && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60" onClick={() => setViewing(null)}>
          <div className="bg-card border border-border rounded-xl shadow-card p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-muted-foreground">{viewing.id}</div>
            <h3 className="font-serif text-xl font-bold text-primary">{viewing.name}</h3>
            <div className="text-sm text-muted-foreground mt-1">{viewing.division} · Submitted {viewing.date}</div>
            <div className="mt-4 space-y-2 text-sm">
              <div><span className="text-muted-foreground">Contact:</span> {viewing.contact}</div>
              <div><span className="text-muted-foreground">Current status:</span> <Badge tone={tone(viewing.status)}>{viewing.status}</Badge></div>
            </div>
            <div className="mt-4">
              <label className="block text-xs font-semibold text-muted-foreground mb-1">Update status</label>
              <select value={viewing.status} onChange={(e) => { update(viewing.id, e.target.value); setViewing({ ...viewing, status: e.target.value }); }} className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm">
                {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="mt-5 pt-4 border-t border-border flex justify-end">
              <GhostButton onClick={() => setViewing(null)}>Close</GhostButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog
        open={!!confirm}
        onOpenChange={(v) => !v && setConfirm(null)}
        title={confirm?.action === "approve" ? "Approve applicant?" : "Decline applicant?"}
        description={confirm ? `${confirm.action === "approve" ? "Mark enrolled" : "Mark declined"} for ${confirm.a.name}?` : ""}
        confirmLabel={confirm?.action === "approve" ? "Approve" : "Decline"}
        onConfirm={() => confirm && update(confirm.a.id, confirm.action === "approve" ? "Enrolled" : "Declined")}
      />
    </div>
  );
}
