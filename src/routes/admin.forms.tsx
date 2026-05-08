import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle } from "@/components/admin/AdminUI";
import { ConfirmDialog } from "@/components/admin/CrudModal";
import { Eye, Download, Trash2, Reply, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, toCSV } from "@/lib/admin-csv";

export const Route = createFileRoute("/admin/forms")({
  component: FormsAdmin,
});

type Visit = { id: string; name: string; phone: string; date: string; purpose: string; status: "Confirmed" | "Pending" | "Cancelled" };
type Msg = { id: string; name: string; email: string; subject: string; body: string; status: "Open" | "Replied" };

const V_SEED: Visit[] = [
  { id: "V-001", name: "Aster Hailu", phone: "+251 91 222 1010", date: "2025-11-09", purpose: "Campus tour", status: "Confirmed" },
  { id: "V-002", name: "Tariku Bekele", phone: "+251 91 222 2020", date: "2025-11-11", purpose: "Admissions inquiry", status: "Pending" },
  { id: "V-003", name: "Selam Ali", phone: "+251 91 222 3030", date: "2025-11-14", purpose: "Meeting with Head of School", status: "Pending" },
];
const M_SEED: Msg[] = [
  { id: "M-001", name: "Bekele M.", email: "bekele@example.com", subject: "Tuition fee inquiry", body: "Hello, I would like to know more about the tuition payment schedule for Grade 5.", status: "Open" },
  { id: "M-002", name: "Ruth A.", email: "ruth@example.com", subject: "Transport service", body: "Do you offer school transportation from the Bole area?", status: "Replied" },
];

function FormsAdmin() {
  const [visits, setVisits] = useState<Visit[]>(V_SEED);
  const [msgs, setMsgs] = useState<Msg[]>(M_SEED);
  const [vQ, setVQ] = useState("");
  const [mQ, setMQ] = useState("");
  const [viewVisit, setViewVisit] = useState<Visit | null>(null);
  const [viewMsg, setViewMsg] = useState<Msg | null>(null);
  const [delVisit, setDelVisit] = useState<Visit | null>(null);
  const [delMsg, setDelMsg] = useState<Msg | null>(null);

  const visitsF = useMemo(() => visits.filter((v) => (v.name + v.phone + v.purpose).toLowerCase().includes(vQ.toLowerCase())), [visits, vQ]);
  const msgsF = useMemo(() => msgs.filter((m) => (m.name + m.email + m.subject).toLowerCase().includes(mQ.toLowerCase())), [msgs, mQ]);

  const setVStatus = (id: string, s: Visit["status"]) => { setVisits((p) => p.map((v) => v.id === id ? { ...v, status: s } : v)); toast.success(`Visit ${s.toLowerCase()}`); };
  const reply = (m: Msg) => { setMsgs((p) => p.map((x) => x.id === m.id ? { ...x, status: "Replied" } : x)); toast.success("Marked as replied"); };

  return (
    <div>
      <PageTitle title="Forms" subtitle="Submissions from website visitors." />

      <div className="space-y-6">
        <AdminCard title="Book a Visit Submissions" action={<GhostButton onClick={() => { downloadCSV(`visits-${Date.now()}.csv`, toCSV(visits)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={vQ} onChange={(e) => setVQ(e.target.value)} placeholder="Search visit submissions…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <AdminTable
            headers={["ID", "Name", "Phone", "Visit Date", "Purpose", "Status", "Actions"]}
            rows={visitsF.map((v) => [
              <span className="font-mono text-xs">{v.id}</span>,
              <span className="font-medium">{v.name}</span>,
              v.phone, v.date, v.purpose,
              <Badge tone={v.status === "Confirmed" ? "success" : v.status === "Cancelled" ? "danger" : "warn"}>{v.status}</Badge>,
              <div className="flex gap-2">
                <button onClick={() => setViewVisit(v)} className="text-muted-foreground hover:text-primary"><Eye className="h-4 w-4" /></button>
                {v.status !== "Confirmed" && <button onClick={() => setVStatus(v.id, "Confirmed")} className="text-xs text-emerald-600 hover:underline">Confirm</button>}
                {v.status !== "Cancelled" && <button onClick={() => setVStatus(v.id, "Cancelled")} className="text-xs text-destructive hover:underline">Cancel</button>}
                <button onClick={() => setDelVisit(v)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>,
            ])}
          />
          {visitsF.length === 0 && <div className="text-center py-6 text-sm text-muted-foreground">No submissions.</div>}
        </AdminCard>

        <AdminCard title="Contact Messages" action={<GhostButton onClick={() => { downloadCSV(`messages-${Date.now()}.csv`, toCSV(msgs)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>}>
          <div className="relative mb-4">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={mQ} onChange={(e) => setMQ(e.target.value)} placeholder="Search messages…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <AdminTable
            headers={["ID", "Name", "Email", "Subject", "Status", "Actions"]}
            rows={msgsF.map((m) => [
              <span className="font-mono text-xs">{m.id}</span>,
              <span className="font-medium">{m.name}</span>,
              <a href={`mailto:${m.email}`} className="text-xs text-primary hover:text-accent">{m.email}</a>,
              m.subject,
              <Badge tone={m.status === "Open" ? "warn" : "success"}>{m.status}</Badge>,
              <div className="flex gap-2">
                <button onClick={() => setViewMsg(m)} className="text-muted-foreground hover:text-primary"><Eye className="h-4 w-4" /></button>
                {m.status === "Open" && <button onClick={() => reply(m)} className="text-muted-foreground hover:text-emerald-600" title="Mark replied"><Reply className="h-4 w-4" /></button>}
                <button onClick={() => setDelMsg(m)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>,
            ])}
          />
          {msgsF.length === 0 && <div className="text-center py-6 text-sm text-muted-foreground">No messages.</div>}
        </AdminCard>
      </div>

      {viewVisit && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60" onClick={() => setViewVisit(null)}>
          <div className="bg-card border border-border rounded-xl shadow-card p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-muted-foreground">{viewVisit.id}</div>
            <h3 className="font-serif text-xl font-bold text-primary">{viewVisit.name}</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div><span className="text-muted-foreground">Phone:</span> {viewVisit.phone}</div>
              <div><span className="text-muted-foreground">Visit date:</span> {viewVisit.date}</div>
              <div><span className="text-muted-foreground">Purpose:</span> {viewVisit.purpose}</div>
              <div><span className="text-muted-foreground">Status:</span> <Badge tone={viewVisit.status === "Confirmed" ? "success" : viewVisit.status === "Cancelled" ? "danger" : "warn"}>{viewVisit.status}</Badge></div>
            </div>
            <div className="mt-5 pt-4 border-t border-border flex justify-end"><GhostButton onClick={() => setViewVisit(null)}>Close</GhostButton></div>
          </div>
        </div>
      )}
      {viewMsg && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60" onClick={() => setViewMsg(null)}>
          <div className="bg-card border border-border rounded-xl shadow-card p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="text-xs text-muted-foreground">{viewMsg.id} · {viewMsg.email}</div>
            <h3 className="font-serif text-xl font-bold text-primary">{viewMsg.subject}</h3>
            <div className="text-sm text-muted-foreground mt-1">From {viewMsg.name}</div>
            <p className="mt-4 text-sm bg-surface border border-border rounded-md p-3 whitespace-pre-wrap">{viewMsg.body}</p>
            <div className="mt-5 pt-4 border-t border-border flex justify-end gap-2">
              <a href={`mailto:${viewMsg.email}?subject=Re: ${encodeURIComponent(viewMsg.subject)}`} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary"><Reply className="h-4 w-4" /> Reply by email</a>
              <GhostButton onClick={() => setViewMsg(null)}>Close</GhostButton>
            </div>
          </div>
        </div>
      )}

      <ConfirmDialog open={!!delVisit} onOpenChange={(v) => !v && setDelVisit(null)} title="Delete submission?" description={delVisit?.name} onConfirm={() => delVisit && (setVisits((p) => p.filter((x) => x.id !== delVisit.id)), toast.success("Removed"))} />
      <ConfirmDialog open={!!delMsg} onOpenChange={(v) => !v && setDelMsg(null)} title="Delete message?" description={delMsg?.subject} onConfirm={() => delMsg && (setMsgs((p) => p.filter((x) => x.id !== delMsg.id)), toast.success("Removed"))} />
    </div>
  );
}
