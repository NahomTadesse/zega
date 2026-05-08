import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, PrimaryButton, StatCard } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Download, Upload, Pencil, Trash2, Plus, Search, FileBarChart, CheckCircle2, FileEdit, Eye } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, parseCSV, pickFile, toCSV } from "@/lib/admin-csv";
import { Checkbox } from "@/components/ui/checkbox";

export const Route = createFileRoute("/admin/results")({
  component: ResultsAdmin,
});

type Result = {
  id: string; name: string; grade: string; term: string;
  math: number; english: number; science: number; humanities: number; ict: number;
  status: "Draft" | "Published";
};

const SEED: Result[] = [
  { id: "ZIS-1025", name: "Yonas Alemu", grade: "Grade 9", term: "Term 1", math: 82, english: 88, science: 80, humanities: 86, ict: 84, status: "Published" },
  { id: "ZIS-1024", name: "Liya Bekele", grade: "Grade 6", term: "Term 1", math: 92, english: 95, science: 89, humanities: 90, ict: 89, status: "Published" },
  { id: "ZIS-1030", name: "Helen Solomon", grade: "Grade 11", term: "Term 1", math: 70, english: 78, science: 74, humanities: 80, ict: 78, status: "Draft" },
  { id: "ZIS-1027", name: "Henok Girma", grade: "Grade 4", term: "Term 1", math: 85, english: 90, science: 88, humanities: 87, ict: 90, status: "Published" },
  { id: "ZIS-1029", name: "Eyob Hailu", grade: "Grade 8", term: "Term 1", math: 65, english: 72, science: 70, humanities: 74, ict: 78, status: "Draft" },
];

const TERMS = ["Term 1", "Term 2", "Term 3"];
const GRADES = ["Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Year 11", "Year 12"];
const FIELDS: FieldDef[] = [
  { name: "id", label: "Student ID", required: true },
  { name: "name", label: "Student Name", required: true },
  { name: "grade", label: "Grade", type: "select", options: GRADES, required: true },
  { name: "term", label: "Term", type: "select", options: TERMS, required: true },
  { name: "math", label: "Mathematics", type: "number", required: true },
  { name: "english", label: "English", type: "number", required: true },
  { name: "science", label: "Science", type: "number", required: true },
  { name: "humanities", label: "Humanities", type: "number", required: true },
  { name: "ict", label: "ICT", type: "number", required: true },
  { name: "status", label: "Status", type: "select", options: ["Draft", "Published"], required: true },
];

const avg = (r: Result) => Math.round((r.math + r.english + r.science + r.humanities + r.ict) / 5);
const grade = (n: number) => n >= 90 ? "A*" : n >= 80 ? "A" : n >= 70 ? "B" : n >= 60 ? "C" : n >= 50 ? "D" : "E";

function ResultsAdmin() {
  const [rows, setRows] = useState<Result[]>(SEED);
  const [q, setQ] = useState("");
  const [term, setTerm] = useState("");
  const [status, setStatus] = useState("");
  const [editing, setEditing] = useState<Result | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Result | null>(null);
  const [viewing, setViewing] = useState<Result | null>(null);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [bulkDelete, setBulkDelete] = useState(false);

  const keyOf = (r: Result) => r.id + "|" + r.term;

  const filtered = useMemo(() => rows.filter((r) =>
    (r.name + r.id + r.grade).toLowerCase().includes(q.toLowerCase()) &&
    (term ? r.term === term : true) && (status ? r.status === status : true)
  ), [rows, q, term, status]);

  const stats = useMemo(() => {
    const published = rows.filter((r) => r.status === "Published").length;
    const drafts = rows.length - published;
    const overall = rows.length ? Math.round(rows.map(avg).reduce((a, b) => a + b, 0) / rows.length) : 0;
    return { published, drafts, overall, total: rows.length };
  }, [rows]);

  const startAdd = () => { setEditing({ id: "", name: "", grade: "", term: "Term 1", math: 0, english: 0, science: 0, humanities: 0, ict: 0, status: "Draft" }); setOrigKey(null); setOpen(true); };
  const startEdit = (r: Result) => { setEditing(r); setOrigKey(r.id + r.term); setOpen(true); };
  const save = (next: Result) => {
    setRows((prev) => origKey ? prev.map((p) => (p.id + p.term === origKey ? next : p)) : [next, ...prev]);
    setOpen(false); toast.success(origKey ? "Result updated" : "Result added");
  };
  const remove = (r: Result) => { setRows((p) => p.filter((x) => !(x.id === r.id && x.term === r.term))); toast.success("Result removed"); };
  const togglePublish = (r: Result) => {
    setRows((p) => p.map((x) => x === r ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x));
    toast.success(r.status === "Published" ? "Moved to draft" : "Result published");
  };
  const publishAll = () => { setRows((p) => p.map((r) => ({ ...r, status: "Published" }))); toast.success("All results published"); };

  const visibleKeys = filtered.map(keyOf);
  const allSelected = visibleKeys.length > 0 && visibleKeys.every((k) => selected.has(k));
  const toggleAll = () => setSelected((prev) => {
    const n = new Set(prev);
    if (allSelected) visibleKeys.forEach((k) => n.delete(k));
    else visibleKeys.forEach((k) => n.add(k));
    return n;
  });
  const toggleOne = (k: string) => setSelected((prev) => { const n = new Set(prev); n.has(k) ? n.delete(k) : n.add(k); return n; });
  const clearSel = () => setSelected(new Set());
  const bulkSetStatus = (s: "Published" | "Draft") => {
    if (selected.size === 0) return;
    setRows((p) => p.map((r) => selected.has(keyOf(r)) ? { ...r, status: s } : r));
    toast.success(`${selected.size} result(s) ${s === "Published" ? "published" : "unpublished"}`);
    clearSel();
  };
  const confirmBulkDelete = () => {
    setRows((p) => p.filter((r) => !selected.has(keyOf(r))));
    toast.success(`${selected.size} result(s) removed`);
    clearSel();
    setBulkDelete(false);
  };

  return (
    <div>
      <PageTitle
        title="Results"
        subtitle="Manage and publish student results by term."
        action={
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={async () => {
              const f = await pickFile(); if (!f) return;
              const parsed = parseCSV(await f.text());
              const mapped: Result[] = parsed.map((r: any) => ({
                id: r.id, name: r.name, grade: r.grade, term: r.term || "Term 1",
                math: Number(r.math || 0), english: Number(r.english || 0), science: Number(r.science || 0),
                humanities: Number(r.humanities || 0), ict: Number(r.ict || 0),
                status: (r.status === "Published" ? "Published" : "Draft"),
              }));
              setRows((prev) => [...mapped, ...prev]); toast.success(`Imported ${mapped.length} rows`);
            }}><Upload className="h-4 w-4" /> Import</GhostButton>
            <GhostButton onClick={() => { downloadCSV(`results-${Date.now()}.csv`, toCSV(rows.map((r) => ({ ...r, average: avg(r), letter: grade(avg(r)) })))); toast.success("Exported"); }}><Download className="h-4 w-4" /> Export</GhostButton>
            <GhostButton onClick={publishAll}><CheckCircle2 className="h-4 w-4" /> Publish All</GhostButton>
            <PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> Add Result</PrimaryButton>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-6">
        <StatCard label="Total Results" value={stats.total} icon={FileBarChart} tone="primary" />
        <StatCard label="Published" value={stats.published} icon={CheckCircle2} tone="success" />
        <StatCard label="Drafts" value={stats.drafts} icon={FileEdit} tone="accent" />
        <StatCard label="Overall Average" value={`${stats.overall}%`} hint="All terms, all grades" tone="muted" />
      </div>

      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by student or grade…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={term} onChange={(e) => setTerm(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All terms</option>
            {TERMS.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
          <select value={status} onChange={(e) => setStatus(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All statuses</option>
            <option value="Published">Published</option>
            <option value="Draft">Draft</option>
          </select>
        </div>
        {selected.size > 0 && (
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4 px-4 py-3 rounded-md border border-accent/40 bg-accent/10">
            <div className="text-sm font-medium">{selected.size} selected</div>
            <div className="flex flex-wrap gap-2">
              <GhostButton onClick={() => bulkSetStatus("Published")}><CheckCircle2 className="h-4 w-4" /> Publish</GhostButton>
              <GhostButton onClick={() => bulkSetStatus("Draft")}><FileEdit className="h-4 w-4" /> Unpublish</GhostButton>
              <GhostButton onClick={() => setBulkDelete(true)}><Trash2 className="h-4 w-4" /> Delete</GhostButton>
              <GhostButton onClick={clearSel}>Clear</GhostButton>
            </div>
          </div>
        )}
        <AdminTable
          headers={[
            (<Checkbox checked={allSelected} onCheckedChange={toggleAll} aria-label="Select all" />) as unknown as string,
            "Student ID", "Name", "Grade", "Term", "Average", "Letter", "Status", "Actions",
          ]}
          rows={filtered.map((r) => {
            const a = avg(r);
            const k = keyOf(r);
            return [
              <Checkbox checked={selected.has(k)} onCheckedChange={() => toggleOne(k)} aria-label={`Select ${r.name}`} />,
              <span className="font-mono text-xs">{r.id}</span>,
              <span className="font-medium">{r.name}</span>,
              r.grade, r.term,
              <span className="font-semibold">{a}%</span>,
              <Badge tone={a >= 80 ? "success" : a >= 60 ? "info" : "warn"}>{grade(a)}</Badge>,
              <Badge tone={r.status === "Published" ? "success" : "warn"}>{r.status}</Badge>,
              <div className="flex gap-2">
                <button onClick={() => setViewing(r)} className="text-muted-foreground hover:text-primary" aria-label="View"><Eye className="h-4 w-4" /></button>
                <button onClick={() => togglePublish(r)} className="text-muted-foreground hover:text-emerald-600" aria-label="Toggle publish"><CheckCircle2 className="h-4 w-4" /></button>
                <button onClick={() => startEdit(r)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                <button onClick={() => setDeleting(r)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </div>,
            ];
          })}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No results match your filters.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Result" : "Add Result"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Delete result?" description={deleting ? `${deleting.name} – ${deleting.term}` : ""} onConfirm={() => deleting && remove(deleting)} />
      <ConfirmDialog open={bulkDelete} onOpenChange={setBulkDelete} title={`Delete ${selected.size} result(s)?`} description="This action cannot be undone." onConfirm={confirmBulkDelete} />

      {viewing && (
        <div className="fixed inset-0 z-50 grid place-items-center p-4 bg-black/60" onClick={() => setViewing(null)}>
          <div className="bg-card border border-border rounded-xl shadow-card p-6 w-full max-w-lg" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="text-xs text-muted-foreground">{viewing.id} · {viewing.term}</div>
                <h3 className="font-serif text-xl font-bold text-primary">{viewing.name}</h3>
                <div className="text-sm text-muted-foreground">{viewing.grade}</div>
              </div>
              <Badge tone={viewing.status === "Published" ? "success" : "warn"}>{viewing.status}</Badge>
            </div>
            <div className="space-y-2">
              {[["Mathematics", viewing.math], ["English", viewing.english], ["Science", viewing.science], ["Humanities", viewing.humanities], ["ICT", viewing.ict]].map(([s, n]) => (
                <div key={s as string} className="flex items-center gap-3">
                  <div className="w-32 text-sm">{s}</div>
                  <div className="flex-1 h-2 rounded-full bg-secondary overflow-hidden"><div className="h-full bg-accent" style={{ width: `${n}%` }} /></div>
                  <div className="w-12 text-right text-sm font-semibold">{n as number}%</div>
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-border flex items-center justify-between">
              <div>
                <div className="text-xs text-muted-foreground">Average</div>
                <div className="font-serif text-2xl font-bold text-primary">{avg(viewing)}% · {grade(avg(viewing))}</div>
              </div>
              <GhostButton onClick={() => setViewing(null)}>Close</GhostButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
