import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Plus, Search, Filter, Pencil, Trash2, Upload, Download } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { downloadCSV, parseCSV, pickFile, toCSV } from "@/lib/admin-csv";

export const Route = createFileRoute("/admin/students")({
  component: StudentsAdmin,
});

type Student = { id: string; name: string; grade: string; section: string; guardian: string; status: string };

const SEED: Student[] = [
  { id: "ZIS-1024", name: "Liya Bekele", grade: "Grade 6", section: "A", guardian: "Bekele Mengistu", status: "Active" },
  { id: "ZIS-1025", name: "Yonas Alemu", grade: "Grade 9", section: "B", guardian: "Alemu Tesfaye", status: "Active" },
  { id: "ZIS-1026", name: "Sara Tesfaye", grade: "Year 12", section: "—", guardian: "Tesfaye Mulu", status: "Active" },
  { id: "ZIS-1027", name: "Henok Girma", grade: "Grade 4", section: "A", guardian: "Girma Wolde", status: "Active" },
  { id: "ZIS-1028", name: "Mariam Kedir", grade: "Year 1", section: "—", guardian: "Kedir Ahmed", status: "Active" },
  { id: "ZIS-1029", name: "Eyob Hailu", grade: "Grade 8", section: "C", guardian: "Hailu Berhe", status: "On Leave" },
  { id: "ZIS-1030", name: "Helen Solomon", grade: "Grade 11", section: "—", guardian: "Solomon Tadesse", status: "Active" },
];

const GRADES = ["Year 1", "Year 2", "Grade 3", "Grade 4", "Grade 5", "Grade 6", "Grade 7", "Grade 8", "Grade 9", "Grade 10", "Year 11", "Year 12"];
const FIELDS: FieldDef[] = [
  { name: "id", label: "Student ID", required: true, placeholder: "ZIS-1031" },
  { name: "name", label: "Full Name", required: true },
  { name: "grade", label: "Grade", type: "select", options: GRADES, required: true },
  { name: "section", label: "Section", placeholder: "A / B / —" },
  { name: "guardian", label: "Guardian", required: true },
  { name: "status", label: "Status", type: "select", options: ["Active", "On Leave", "Withdrawn"], required: true },
];

function StudentsAdmin() {
  const [rows, setRows] = useState<Student[]>(SEED);
  const [q, setQ] = useState("");
  const [grade, setGrade] = useState("");
  const [editing, setEditing] = useState<Student | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Student | null>(null);

  const filtered = useMemo(
    () => rows.filter((s) =>
      (s.name + s.id + s.grade + s.guardian).toLowerCase().includes(q.toLowerCase()) &&
      (grade ? s.grade === grade : true)
    ),
    [rows, q, grade]
  );

  const startAdd = () => {
    setEditing({ id: `ZIS-${1031 + rows.length}`, name: "", grade: "", section: "", guardian: "", status: "Active" });
    setOpen(true);
  };
  const startEdit = (s: Student) => { setEditing(s); setOpen(true); };
  const save = (next: Student) => {
    setRows((prev) => {
      const idx = prev.findIndex((p) => p.id === editing?.id);
      if (idx >= 0) { const c = [...prev]; c[idx] = next; return c; }
      return [next, ...prev];
    });
    setOpen(false);
    toast.success(`Student ${editing && rows.find((r) => r.id === editing.id) ? "updated" : "added"}`);
  };
  const remove = (s: Student) => { setRows((p) => p.filter((r) => r.id !== s.id)); toast.success("Student deleted"); };

  const exportCSV = () => { downloadCSV(`students-${Date.now()}.csv`, toCSV(rows)); toast.success("Exported students.csv"); };
  const importCSV = async () => {
    const file = await pickFile();
    if (!file) return;
    const text = await file.text();
    const parsed = parseCSV(text) as unknown as Student[];
    if (!parsed.length) { toast.error("No rows found"); return; }
    setRows((prev) => {
      const map = new Map(prev.map((r) => [r.id, r] as const));
      for (const r of parsed) if (r.id) map.set(r.id, { ...map.get(r.id), ...r } as Student);
      return Array.from(map.values());
    });
    toast.success(`Imported ${parsed.length} rows`);
  };

  return (
    <div>
      <PageTitle
        title="Students"
        subtitle="Manage enrolled students across all divisions."
        action={
          <div className="flex flex-wrap gap-2">
            <GhostButton onClick={importCSV}><Upload className="h-4 w-4" /> Import</GhostButton>
            <GhostButton onClick={exportCSV}><Download className="h-4 w-4" /> Export</GhostButton>
            <PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> Add Student</PrimaryButton>
          </div>
        }
      />

      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search by name, ID or guardian…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={grade} onChange={(e) => setGrade(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All grades</option>
            {GRADES.map((g) => <option key={g} value={g}>{g}</option>)}
          </select>
          <GhostButton onClick={() => { setQ(""); setGrade(""); }}><Filter className="h-4 w-4" /> Reset</GhostButton>
        </div>
        <AdminTable
          headers={["ID", "Name", "Grade", "Section", "Guardian", "Status", "Actions"]}
          rows={filtered.map((s) => [
            <span className="font-mono text-xs">{s.id}</span>,
            <span className="font-medium">{s.name}</span>,
            s.grade,
            s.section,
            s.guardian,
            <Badge tone={s.status === "Active" ? "success" : s.status === "Withdrawn" ? "danger" : "warn"}>{s.status}</Badge>,
            <div className="flex gap-2">
              <button onClick={() => startEdit(s)} className="text-muted-foreground hover:text-primary" aria-label="Edit"><Pencil className="h-4 w-4" /></button>
              <button onClick={() => setDeleting(s)} className="text-muted-foreground hover:text-destructive" aria-label="Delete"><Trash2 className="h-4 w-4" /></button>
            </div>,
          ])}
        />
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No students match your filters.</div>}
      </AdminCard>

      {editing && (
        <CrudModal
          open={open}
          onOpenChange={setOpen}
          title={rows.find((r) => r.id === editing.id) ? "Edit Student" : "Add Student"}
          fields={FIELDS}
          value={editing}
          onSubmit={save}
        />
      )}
      <ConfirmDialog
        open={!!deleting}
        onOpenChange={(v) => !v && setDeleting(null)}
        title="Delete student?"
        description={deleting ? `This will remove ${deleting.name} (${deleting.id}).` : ""}
        onConfirm={() => deleting && remove(deleting)}
      />
    </div>
  );
}
