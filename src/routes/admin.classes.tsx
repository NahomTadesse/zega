import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Plus, Users, Pencil, Trash2, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/classes")({
  component: ClassesAdmin,
});

type Klass = { name: string; division: string; teacher: string; students: number };

const SEED: Klass[] = [
  { name: "Year 1", division: "Early Years", teacher: "Eden Tesfaye", students: 18 },
  { name: "Grade 2", division: "Primary", teacher: "Selam Mengistu", students: 22 },
  { name: "Grade 4 A", division: "Primary", teacher: "Hiwot Bekele", students: 24 },
  { name: "Grade 6 A", division: "Primary", teacher: "Yared Gizaw", students: 23 },
  { name: "Grade 8 C", division: "Middle School", teacher: "Hanna Wolde", students: 20 },
  { name: "Grade 9 B", division: "Middle School", teacher: "Daniel Tadesse", students: 19 },
  { name: "Year 11", division: "High School", teacher: "Samuel Asfaw", students: 17 },
  { name: "Year 12", division: "High School", teacher: "Daniel Tadesse", students: 14 },
];

const DIVISIONS = ["Early Years", "Primary", "Middle School", "High School"];
const FIELDS: FieldDef[] = [
  { name: "name", label: "Class Name", required: true, placeholder: "Grade 7 A" },
  { name: "division", label: "Division", type: "select", options: DIVISIONS, required: true },
  { name: "teacher", label: "Homeroom Teacher", required: true },
  { name: "students", label: "Student Count", type: "number", required: true },
];

function ClassesAdmin() {
  const [rows, setRows] = useState<Klass[]>(SEED);
  const [q, setQ] = useState("");
  const [editing, setEditing] = useState<Klass | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Klass | null>(null);

  const filtered = useMemo(() => rows.filter((c) => (c.name + c.division + c.teacher).toLowerCase().includes(q.toLowerCase())), [rows, q]);

  const startAdd = () => { setEditing({ name: "", division: "", teacher: "", students: 0 }); setOrigKey(null); setOpen(true); };
  const startEdit = (c: Klass) => { setEditing(c); setOrigKey(c.name); setOpen(true); };
  const save = (next: Klass) => {
    setRows((prev) => origKey ? prev.map((p) => p.name === origKey ? next : p) : [next, ...prev]);
    setOpen(false); toast.success(origKey ? "Class updated" : "Class added");
  };
  const remove = (c: Klass) => { setRows((p) => p.filter((r) => r.name !== c.name)); toast.success("Class removed"); };

  return (
    <div>
      <PageTitle
        title="Classes"
        subtitle="Class sections, homeroom teachers and enrolment counts."
        action={<PrimaryButton onClick={startAdd}><Plus className="h-4 w-4" /> New Class</PrimaryButton>}
      />

      <AdminCard>
        <div className="flex gap-3 mb-5">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search classes…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <GhostButton onClick={() => setQ("")}>Reset</GhostButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 -m-1">
          {filtered.map((c) => (
            <div key={c.name} className="bg-card border border-border rounded-xl p-5 shadow-soft">
              <div className="flex items-start justify-between">
                <div>
                  <div className="text-xs font-semibold text-accent">{c.division}</div>
                  <h3 className="font-serif text-lg font-bold text-primary mt-0.5">{c.name}</h3>
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Users className="h-5 w-5" /></div>
              </div>
              <div className="mt-3 text-sm text-muted-foreground">Homeroom · {c.teacher}</div>
              <div className="mt-1 text-sm font-semibold">{c.students} students</div>
              <div className="mt-4 flex gap-2 pt-3 border-t border-border">
                <button onClick={() => startEdit(c)} className="inline-flex items-center gap-1 text-xs text-primary hover:text-accent"><Pencil className="h-3.5 w-3.5" /> Edit</button>
                <button onClick={() => setDeleting(c)} className="inline-flex items-center gap-1 text-xs text-destructive hover:opacity-80 ml-auto"><Trash2 className="h-3.5 w-3.5" /> Delete</button>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No classes found.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Class" : "Add Class"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Delete class?" description={deleting?.name} onConfirm={() => deleting && remove(deleting)} />
    </div>
  );
}
