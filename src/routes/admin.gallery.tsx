import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { Trash2, Upload, Pencil, Search } from "lucide-react";
import { useMemo, useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/gallery")({
  component: GalleryAdmin,
});

type Photo = { id: string; label: string; category: string };

const SEED: Photo[] = [
  { id: "g1", label: "School Compound", category: "Campus" },
  { id: "g2", label: "Modern Classrooms", category: "Classrooms" },
  { id: "g3", label: "Career Day", category: "Events" },
  { id: "g4", label: "Culture Day", category: "Events" },
  { id: "g5", label: "Gymnasium", category: "Facilities" },
  { id: "g6", label: "Library", category: "Facilities" },
  { id: "g7", label: "Art Day", category: "Activities" },
  { id: "g8", label: "Sports Day", category: "Activities" },
  { id: "g9", label: "Graduation", category: "Events" },
];

const CATEGORIES = ["Campus", "Classrooms", "Facilities", "Activities", "Events"];
const FIELDS: FieldDef[] = [
  { name: "label", label: "Caption", required: true },
  { name: "category", label: "Category", type: "select", options: CATEGORIES, required: true },
];

function GalleryAdmin() {
  const [rows, setRows] = useState<Photo[]>(SEED);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("");
  const [editing, setEditing] = useState<Photo | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Photo | null>(null);

  const filtered = useMemo(() => rows.filter((p) =>
    p.label.toLowerCase().includes(q.toLowerCase()) && (cat ? p.category === cat : true)
  ), [rows, q, cat]);

  const startAdd = () => { setEditing({ id: `g${Date.now()}`, label: "", category: "Campus" }); setOrigKey(null); setOpen(true); };
  const startEdit = (p: Photo) => { setEditing(p); setOrigKey(p.id); setOpen(true); };
  const save = (next: Photo) => {
    setRows((prev) => origKey ? prev.map((p) => p.id === origKey ? next : p) : [next, ...prev]);
    setOpen(false); toast.success(origKey ? "Photo updated" : "Photo added");
  };
  const remove = (p: Photo) => { setRows((prev) => prev.filter((x) => x.id !== p.id)); toast.success("Photo removed"); };

  const upload = () => {
    const input = document.createElement("input");
    input.type = "file"; input.accept = "image/*"; input.multiple = true;
    input.onchange = () => {
      const files = Array.from(input.files || []);
      if (!files.length) return;
      const newRows: Photo[] = files.map((f, i) => ({ id: `g${Date.now()}-${i}`, label: f.name.replace(/\.[^.]+$/, ""), category: "Campus" }));
      setRows((prev) => [...newRows, ...prev]);
      toast.success(`${files.length} photo(s) uploaded`);
    };
    input.click();
  };

  return (
    <div>
      <PageTitle
        title="Gallery"
        subtitle="Upload and organize photos shown on the public gallery."
        action={<PrimaryButton onClick={upload}><Upload className="h-4 w-4" /> Upload Photo</PrimaryButton>}
      />
      <AdminCard>
        <div className="flex flex-wrap gap-3 mb-5">
          <div className="relative flex-1 min-w-[240px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search captions…" className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <select value={cat} onChange={(e) => setCat(e.target.value)} className="h-9 rounded-md border border-input bg-background px-3 text-sm">
            <option value="">All categories</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
          <GhostButton onClick={() => { setQ(""); setCat(""); }}>Reset</GhostButton>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filtered.map((p) => (
            <div key={p.id} className="rounded-lg overflow-hidden border border-border bg-card">
              <ImagePlaceholder label={p.label} ratio="square" />
              <div className="p-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="text-sm font-medium truncate">{p.label}</div>
                    <div className="text-[10px] uppercase tracking-wider text-muted-foreground mt-0.5">{p.category}</div>
                  </div>
                  <div className="flex gap-1 shrink-0">
                    <button onClick={() => startEdit(p)} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                    <button onClick={() => setDeleting(p)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
        {filtered.length === 0 && <div className="text-center py-10 text-sm text-muted-foreground">No photos found.</div>}
      </AdminCard>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Photo" : "Add Photo"} fields={FIELDS} value={editing} onSubmit={save} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Delete photo?" description={deleting?.label} onConfirm={() => deleting && remove(deleting)} />
    </div>
  );
}
