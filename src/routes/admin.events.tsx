import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, Badge, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { CrudModal, ConfirmDialog, FieldDef } from "@/components/admin/CrudModal";
import { Calendar, MapPin, Pencil, Plus, Trash2, Send } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/events")({
  component: EventsAdmin,
});

type Event = { id: string; title: string; date: string; place: string; status: "Draft" | "Published" };
type News = { id: string; title: string; status: "Draft" | "Published" };

const E_SEED: Event[] = [
  { id: "e1", title: "ZIS Culture Day", date: "2025-11-21", place: "School Compound", status: "Published" },
  { id: "e2", title: "Drawing Competition & T-Shirt Imprinting", date: "2025-11-29", place: "School Compound", status: "Published" },
  { id: "e3", title: "Career Day", date: "2025-12-10", place: "School Compound", status: "Draft" },
  { id: "e4", title: "Term 1 Exams Begin", date: "2025-12-15", place: "Examination Halls", status: "Published" },
];
const N_SEED: News[] = [
  { id: "n1", title: "Admissions open for the 2025/26 academic year", status: "Published" },
  { id: "n2", title: "2025/2026 Academic Calendar published", status: "Published" },
  { id: "n3", title: "Parent shareholder meeting recap", status: "Draft" },
];

const E_FIELDS: FieldDef[] = [
  { name: "title", label: "Title", required: true, colSpan: 2 },
  { name: "date", label: "Date", type: "date", required: true },
  { name: "place", label: "Location", required: true },
  { name: "status", label: "Status", type: "select", options: ["Draft", "Published"], required: true },
];
const N_FIELDS: FieldDef[] = [
  { name: "title", label: "Headline", required: true, colSpan: 2 },
  { name: "status", label: "Status", type: "select", options: ["Draft", "Published"], required: true },
];

function EventsAdmin() {
  const [events, setEvents] = useState<Event[]>(E_SEED);
  const [news, setNews] = useState<News[]>(N_SEED);

  const [eEdit, setEEdit] = useState<Event | null>(null); const [eKey, setEKey] = useState<string | null>(null); const [eOpen, setEOpen] = useState(false); const [eDel, setEDel] = useState<Event | null>(null);
  const [nEdit, setNEdit] = useState<News | null>(null); const [nKey, setNKey] = useState<string | null>(null); const [nOpen, setNOpen] = useState(false); const [nDel, setNDel] = useState<News | null>(null);

  return (
    <div>
      <PageTitle title="Events & News" subtitle="Manage events, notices and news items shown on the website." action={
        <div className="flex gap-2">
          <GhostButton onClick={() => { setNEdit({ id: `n${Date.now()}`, title: "", status: "Draft" }); setNKey(null); setNOpen(true); }}><Plus className="h-4 w-4" /> News Item</GhostButton>
          <PrimaryButton onClick={() => { setEEdit({ id: `e${Date.now()}`, title: "", date: "", place: "", status: "Draft" }); setEKey(null); setEOpen(true); }}><Plus className="h-4 w-4" /> New Event</PrimaryButton>
        </div>
      } />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="Events">
          <ul className="space-y-3">
            {events.map((e) => (
              <li key={e.id} className="flex items-start gap-3 p-3 rounded-lg border border-border">
                <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary grid place-items-center"><Calendar className="h-5 w-5" /></div>
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-sm">{e.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-3">
                    <span>{e.date}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3 w-3" /> {e.place}</span>
                  </div>
                </div>
                <Badge tone={e.status === "Published" ? "success" : "warn"}>{e.status}</Badge>
                <div className="flex gap-1">
                  <button onClick={() => { setEvents((p) => p.map((x) => x.id === e.id ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x)); toast.success("Status updated"); }} className="text-muted-foreground hover:text-emerald-600" title="Toggle publish"><Send className="h-4 w-4" /></button>
                  <button onClick={() => { setEEdit(e); setEKey(e.id); setEOpen(true); }} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setEDel(e)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
            {events.length === 0 && <div className="text-center py-6 text-sm text-muted-foreground">No events yet.</div>}
          </ul>
        </AdminCard>

        <AdminCard title="News & Notices">
          <ul className="space-y-3">
            {news.map((n) => (
              <li key={n.id} className="flex items-center gap-3 p-3 rounded-lg border border-border">
                <div className="flex-1 font-semibold text-sm">{n.title}</div>
                <Badge tone={n.status === "Published" ? "success" : "warn"}>{n.status}</Badge>
                <div className="flex gap-1">
                  <button onClick={() => { setNews((p) => p.map((x) => x.id === n.id ? { ...x, status: x.status === "Published" ? "Draft" : "Published" } : x)); toast.success("Status updated"); }} className="text-muted-foreground hover:text-emerald-600"><Send className="h-4 w-4" /></button>
                  <button onClick={() => { setNEdit(n); setNKey(n.id); setNOpen(true); }} className="text-muted-foreground hover:text-primary"><Pencil className="h-4 w-4" /></button>
                  <button onClick={() => setNDel(n)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
            {news.length === 0 && <div className="text-center py-6 text-sm text-muted-foreground">No news yet.</div>}
          </ul>
        </AdminCard>
      </div>

      {eEdit && <CrudModal open={eOpen} onOpenChange={setEOpen} title={eKey ? "Edit Event" : "New Event"} fields={E_FIELDS} value={eEdit} onSubmit={(next) => { setEvents((p) => eKey ? p.map((x) => x.id === eKey ? { ...next, id: eKey } : x) : [next, ...p]); setEOpen(false); toast.success(eKey ? "Event updated" : "Event added"); }} />}
      <ConfirmDialog open={!!eDel} onOpenChange={(v) => !v && setEDel(null)} title="Delete event?" description={eDel?.title} onConfirm={() => eDel && (setEvents((p) => p.filter((x) => x.id !== eDel.id)), toast.success("Event removed"))} />

      {nEdit && <CrudModal open={nOpen} onOpenChange={setNOpen} title={nKey ? "Edit News" : "Add News"} fields={N_FIELDS} value={nEdit} onSubmit={(next) => { setNews((p) => nKey ? p.map((x) => x.id === nKey ? { ...next, id: nKey } : x) : [next, ...p]); setNOpen(false); toast.success(nKey ? "News updated" : "News added"); }} />}
      <ConfirmDialog open={!!nDel} onOpenChange={(v) => !v && setNDel(null)} title="Delete news item?" description={nDel?.title} onConfirm={() => nDel && (setNews((p) => p.filter((x) => x.id !== nDel.id)), toast.success("News removed"))} />
    </div>
  );
}
