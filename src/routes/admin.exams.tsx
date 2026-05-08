import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Plus, Pencil, Trash2, Search, Upload, Download, CheckCircle2, FileEdit } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, parseCSV, pickFile, toCSV } from "@/lib/admin-csv";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/admin/exams")({
  component: ExamsAdmin,
});

type Exam = { id: string; date: string; subject: string; grade: string; room: string; status: string };

const SEED: Exam[] = [
  { id: "EX-001", date: "2025-12-08", subject: "Mathematics", grade: "Grade 9", room: "Hall A", status: "Scheduled" },
  { id: "EX-002", date: "2025-12-09", subject: "English", grade: "Grade 9", room: "Hall A", status: "Scheduled" },
  { id: "EX-003", date: "2025-12-10", subject: "Sciences", grade: "Grade 9", room: "Hall B", status: "Scheduled" },
  { id: "EX-004", date: "2025-12-11", subject: "Humanities", grade: "Grade 9", room: "Hall A", status: "Draft" },
  { id: "EX-005", date: "2025-12-12", subject: "ICT", grade: "Grade 9", room: "Lab 1", status: "Draft" },
];

const GRADES = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Year 11", "Year 12"];
const FIELDS: FieldDef[] = [
  { name: "id", label: "Exam ID", required: true },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "subject", label: "Subject", required: true },
  { name: "grade", label: "Grade", type: "select", options: GRADES, required: true },
  { name: "room", label: "Room", required: true },
  { name: "status", label: "Status", type: "select", options: ["Draft", "Scheduled", "Completed"], required: true },
];

function ExamsAdmin() {
  const [rows, setRows] = useState<Exam[]>(SEED);
  const [q, setQ] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Exam | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Exam | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDelete, setBulkDelete] = useState(false);

  const filtered = useMemo(
    () => rows.filter((e) => (e.subject + e.grade + e.room).toLowerCase().includes(q.toLowerCase()) && (status ? e.status === status : true)),
    [rows, q, status]
  );

  const allVisibleIds = filtered.map((r) => r.id);
  const allSelected = allVisibleIds.length > 0 && allVisibleIds.every((id) => selected.has(id));
  const toggleAll = () => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (allSelected) allVisibleIds.forEach((id) => next.delete(id));
      else allVisibleIds.forEach((id) => next.add(id));
      return next;
    });
  };
  const toggleOne = (id: string) => {
    setSelected((prev) => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });
  };
  const clearSel = () => setSelected(new Set());

  const startAdd = () => { setEditing({ id: `EX-${String(rows.length + 1).padStart(3, "0")}`, date: "", subject: "", grade: "", room: "", status: "Draft" }); setOrigKey(null); setOpen(true); };
  const startEdit = (e: Exam) => { setEditing(e); setOrigKey(e.id); setOpen(true); };
  const save = (next: Exam) => {
    setRows((prev) => origKey ? prev.map((p) => p.id === origKey ? next : p) : [next, ...prev]);
    setOpen(false); toast.success(origKey ? "Exam updated" : "Exam scheduled");
  };
  const remove = (e: Exam) => { setRows((p) => p.filter((r) => r.id !== e.id)); setSelected((s) => { const n = new Set(s); n.delete(e.id); return n; }); toast.success("Exam removed"); };

  const bulkSetStatus = (newStatus: "Scheduled" | "Draft") => {
    if (selected.size === 0) return;
    setRows((p) => p.map((r) => selected.has(r.id) ? { ...r, status: newStatus } : r));
    toast.success(`${selected.size} exam(s) marked ${newStatus}`);
    clearSel();
  };
  const confirmBulkDelete = () => {
    setRows((p) => p.filter((r) => !selected.has(r.id)));
    toast.success(`${selected.size} exam(s) removed`);
    clearSel();
    setBulkDelete(false);
  };

  return (
    <div>
      <PageTitle
        title="Exams"
        subtitle="Plan and publish examination routines."
        action={
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={async () => {
              const f = await pickFile(); if (!f) return;
              const parsed = parseCSV(await f.text()) as unknown as Exam[];
              setRows((prev) => [...parsed, ...prev]); toast.success(`Imported ${parsed.length} rows`);
            }}><Upload className="h-4 w-4" /> Import</GhostButton>
            <GhostButton onClick={() => { downloadCSV(`exams-${Date.now()}.csv`, toCSV(rows)); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>
            <PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> Schedule Exam</PrimaryButton>
          </div>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search exams…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All statuses</option>
            {["Draft", "Scheduled", "Completed"].map((s) => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {selected.size > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-3 rounded-md border border-accent/40 bg-accent/10">
            <div className="text-sm font-medium">{selected.size} selected</div>
            <div className="flex flex-wrap gap-2">
              <GhostButton onClick={() => bulkSetStatus("Scheduled")}><CheckCircle2 className="h-4 w-4" /> Publish</GhostButton>
              <GhostButton onClick={() => bulkSetStatus("Draft")}><FileEdit className="h-4 w-4" /> Unpublish</GhostButton>
              <GhostButton onClick={() => setBulkDelete(true)}><Trash2 className="h-4 w-4" /> Delete</GhostButton>
              <GhostButton onClick={clearSel}>Clear</GhostButton>
            </div>
          </div>
        )}

        <AdminTable
          headers={[
            (<Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />) as unknown as string,
            "ID", "Date", "Subject", "Grade", "Room", "Status", "Actions",
          ]}
          rows={filtered.map((e) => [
            <Checkbox checked={selected.has(e.id)} onCheckedChange={() => toggleOne(e.id)} aria-label={`Select ${e.id}`} />,
            <span className="font-mono text-xs">{e.id}</span>,
            e.date,
            <span className="font-medium">{e.subject}</span>,
            e.grade, e.room,
            <Badge tone={e.status === "Scheduled" ? "success" : e.status === "Completed" ? "info" : "warn"}>{e.status}</Badge>,
            <div className="flex gap-2">
              <button onClick={() => startEdit(e)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setDeleting(e)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
            </div>,
          ])}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No exams scheduled.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Exam" : "Schedule Exam"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Delete exam?" description={deleting?.subject} onConfirm={() => deleting && remove(deleting)} />
      <ConfirmDialog open={bulkDelete} onOpenChange={setBulkDelete} title={`Delete ${selected.size} exam(s)?`} description="This action cannot be undone." onConfirm={confirmBulkDelete} />
    </div>
  );
}
