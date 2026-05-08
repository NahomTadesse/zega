import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Plus, Mail, Pencil, Trash2, Search, Upload, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, parseCSV, pickFile, toCSV } from "@/lib/admin-csv";

export const Route = createFileRoute("/admin/teachers")({
  component: TeachersAdmin,
});

type Teacher = { name: string; subject: string; division: string; email: string; status: string };

const SEED: Teacher[] = [
  { name: "Daniel Tadesse", subject: "Mathematics", division: "High School", email: "d.tadesse@zegainternational.school", status: "Active" },
  { name: "Hanna Wolde", subject: "English Literature", division: "Middle School", email: "h.wolde@zegainternational.school", status: "Active" },
  { name: "Samuel Asfaw", subject: "Sciences", division: "High School", email: "s.asfaw@zegainternational.school", status: "Active" },
  { name: "Selam Mengistu", subject: "Primary Class Teacher", division: "Primary", email: "s.mengistu@zegainternational.school", status: "Active" },
  { name: "Eden Tesfaye", subject: "Early Years Lead", division: "Early Years", email: "e.tesfaye@zegainternational.school", status: "On Leave" },
];

const DIVISIONS = ["Early Years", "Primary", "Middle School", "High School"];
const FIELDS: FieldDef[] = [
  { name: "name", label: "Full Name", required: true },
  { name: "subject", label: "Subject / Role", required: true },
  { name: "division", label: "Division", type: "select", options: DIVISIONS, required: true },
  { name: "email", label: "Email", type: "email", required: true, colSpan: 2 },
  { name: "status", label: "Status", type: "select", options: ["Active", "On Leave"], required: true },
];

function TeachersAdmin() {
  const [rows, setRows] = useState<Teacher[]>(SEED);
  const [q, setQ] = useState("");
  const [div, setDiv] = useState("");
  const [editing, setEditing] = useState<Teacher | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Teacher | null>(null);

  const filtered = useMemo(
    () => rows.filter((t) =>
      (t.name + t.subject + t.email).toLowerCase().includes(q.toLowerCase()) &&
      (div ? t.division === div : true)
    ),
    [rows, q, div]
  );

  const startAdd = () => { setEditing({ name: "", subject: "", division: "", email: "", status: "Active" }); setOrigKey(null); setOpen(true); };
  const startEdit = (t: Teacher) => { setEditing(t); setOrigKey(t.email); setOpen(true); };
  const save = (next: Teacher) => {
    setRows((prev) => {
      if (origKey) return prev.map((p) => (p.email === origKey ? next : p));
      return [next, ...prev];
    });
    setOpen(false);
    toast.success(origKey ? "Teacher updated" : "Teacher added");
  };
  const remove = (t: Teacher) => { setRows((p) => p.filter((r) => r.email !== t.email)); toast.success("Teacher removed"); };

  return (
    <div>
      <PageTitle
        title="Teachers"
        subtitle="Faculty directory and assignments."
        action={
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={async () => {
              const f = await pickFile(); if (!f) return;
              const parsed = parseCSV(await f.text()) as unknown as Teacher[];
              setRows((prev) => [...parsed, ...prev]); toast.success(`Imported ${parsed.length} rows`);
            }}><Upload className="h-4 w-4" /> Import</GhostButton>
            <GhostButton onClick={() => { downloadCSV(`teachers-${Date.now()}.csv`, toCSV(rows)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>
            <PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> Add Teacher</PrimaryButton>
          </div>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, subject or email…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={div} onChange={(e) => setDiv(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All divisions</option>
            {DIVISIONS.map((d) => <option key={d} value={d}>{d}</option>)}
          </select>
        </div>
        <AdminTable
          headers={["Name", "Subject / Role", "Division", "Email", "Status", "Actions"]}
          rows={filtered.map((t) => [
            <span className="font-medium">{t.name}</span>,
            t.subject,
            t.division,
            <a href={`mailto:${t.email}`} className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent"><Mail className="h-3.5 w-3.5" /> {t.email}</a>,
            <Badge tone={t.status === "Active" ? "success" : "warn"}>{t.status}</Badge>,
            <div className="flex gap-2">
              <button onClick={() => startEdit(t)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setDeleting(t)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>,
          ])}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No teachers match.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Teacher" : "Add Teacher"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Remove teacher?" description={deleting?.name} onConfirm={() => deleting && remove(deleting)} />
    </div>
  );
}
