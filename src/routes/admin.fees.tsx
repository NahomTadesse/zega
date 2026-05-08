import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, PrimaryButton, StatCard } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Receipt, AlertCircle, CheckCircle2, Plus, Pencil, Trash2, Search, Upload, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, parseCSV, pickFile, toCSV } from "@/lib/admin-csv";

export const Route = createFileRoute("/admin/fees")({
  component: FeesAdmin,
});

type Invoice = { invoice: string; student: string; amount: number; due: string; status: "Paid" | "Pending" | "Overdue" };

const SEED: Invoice[] = [
  { invoice: "INV-2025-0421", student: "Liya Bekele", amount: 45000, due: "2025-12-01", status: "Paid" },
  { invoice: "INV-2025-0422", student: "Yonas Alemu", amount: 60000, due: "2025-12-01", status: "Overdue" },
  { invoice: "INV-2025-0423", student: "Sara Tesfaye", amount: 75000, due: "2025-12-15", status: "Pending" },
  { invoice: "INV-2025-0424", student: "Henok Girma", amount: 38000, due: "2025-12-01", status: "Paid" },
  { invoice: "INV-2025-0425", student: "Mariam Kedir", amount: 30000, due: "2025-12-15", status: "Pending" },
];

const FIELDS: FieldDef[] = [
  { name: "invoice", label: "Invoice #", required: true },
  { name: "student", label: "Student", required: true },
  { name: "amount", label: "Amount (ETB)", type: "number", required: true },
  { name: "due", label: "Due Date", type: "date", required: true },
  { name: "status", label: "Status", type: "select", options: ["Pending", "Paid", "Overdue"], required: true },
];

const fmt = (n: number) => `ETB ${n.toLocaleString()}`;

function FeesAdmin() {
  const [rows, setRows] = useState<Invoice[]>(SEED);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Invoice | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Invoice | null>(null);

  const filtered = useMemo(() => rows.filter((r) =>
    (r.invoice + r.student).toLowerCase().includes(q.toLowerCase()) && (status ? r.status === status : true)
  ), [rows, q, status]);

  const stats = useMemo(() => ({
    paid: rows.filter((r) => r.status === "Paid").reduce((s, r) => s + r.amount, 0),
    outstanding: rows.filter((r) => r.status !== "Paid").reduce((s, r) => s + r.amount, 0),
    count: rows.length,
  }), [rows]);

  const startAdd = () => { setEditing({ invoice: `INV-2025-${String(rows.length + 426).padStart(4, "0")}`, student: "", amount: 0, due: "", status: "Pending" }); setOrigKey(null); setOpen(true); };
  const startEdit = (r: Invoice) => { setEditing(r); setOrigKey(r.invoice); setOpen(true); };
  const save = (next: Invoice) => {
    setRows((prev) => origKey ? prev.map((p) => p.invoice === origKey ? next : p) : [next, ...prev]);
    setOpen(false); toast.success(origKey ? "Invoice updated" : "Invoice created");
  };
  const remove = (r: Invoice) => { setRows((p) => p.filter((x) => x.invoice !== r.invoice)); toast.success("Invoice removed"); };
  const markPaid = (r: Invoice) => { setRows((p) => p.map((x) => x.invoice === r.invoice ? { ...x, status: "Paid" } : x)); toast.success("Marked as paid"); };

  return (
    <div>
      <PageTitle
        title="Tuition Fees"
        subtitle="Track invoices, payments and outstanding balances."
        action={
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={async () => {
              const f = await pickFile(); if (!f) return;
              const parsed = parseCSV(await f.text());
              const mapped: Invoice[] = parsed.map((r: any) => ({ invoice: r.invoice, student: r.student, amount: Number(r.amount || 0), due: r.due, status: (r.status || "Pending") as Invoice["status"] }));
              setRows((prev) => [...mapped, ...prev]); toast.success(`Imported ${mapped.length} rows`);
            }}><Upload className="h-4 w-4" /> Import</GhostButton>
            <GhostButton onClick={() => { downloadCSV(`invoices-${Date.now()}.csv`, toCSV(rows)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>
            <PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> New Invoice</PrimaryButton>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3 mb-6">
        <StatCard label="Collected" value={fmt(stats.paid)} icon={CheckCircle2} tone="success" />
        <StatCard label="Outstanding" value={fmt(stats.outstanding)} icon={AlertCircle} tone="accent" />
        <StatCard label="Invoices" value={stats.count} icon={Receipt} tone="primary" />
      </div>

      <AdminCard title="Invoices">
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search invoices…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All statuses</option>
            {["Paid", "Pending", "Overdue"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>
        <AdminTable
          headers={["Invoice", "Student", "Amount", "Due", "Status", "Actions"]}
          rows={filtered.map((i) => [
            <span className="font-mono text-xs">{i.invoice}</span>,
            <span className="font-medium">{i.student}</span>,
            fmt(i.amount), i.due,
            <Badge tone={i.status === "Paid" ? "success" : i.status === "Overdue" ? "danger" : "warn"}>{i.status}</Badge>,
            <div className="flex gap-2">
              {i.status !== "Paid" && <button onClick={() => markPaid(i)} className="text-muted-foreground hover:text-emerald-600" title="Mark paid"><CheckCircle2 className="h-4 w-4" /></button>}
              <button onClick={() => startEdit(i)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setDeleting(i)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>,
          ])}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No invoices match.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Invoice" : "New Invoice"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Delete invoice?" description={deleting?.invoice} onConfirm={() => deleting && remove(deleting)} />
    </div>
  );
}
