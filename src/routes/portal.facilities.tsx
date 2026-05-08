import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell } from "@/components/site/PortalPageShell";
import { Building, FlaskConical, Library, MonitorPlay, Music, Trophy, Utensils } from "lucide-react";

const facilities = [
  { icon: Library, title: "Library & Learning Commons", desc: "Quiet study, group rooms, and a curated collection of fiction and reference texts." },
  { icon: FlaskConical, title: "Science Laboratories", desc: "Dedicated Biology, Chemistry and Physics labs equipped for IGCSE and A Level practical work." },
  { icon: MonitorPlay, title: "Computer Labs", desc: "Modern workstations supporting our ICT and Computer Science programmes." },
  { icon: Trophy, title: "Sports & Gymnasium", desc: "Indoor gymnasium and outdoor courts for PE and competitive sport." },
  { icon: Music, title: "Arts & Music Studios", desc: "Spaces for visual arts, instrumental practice and ensemble work." },
  { icon: Utensils, title: "Dining Hall", desc: "Healthy, balanced meals served in a welcoming communal setting." },
  { icon: Building, title: "Safe Campus", desc: "Secure compound in Lideta with controlled access, CCTV and trained staff." },
];

export const Route = createFileRoute("/portal/facilities")({
  head: () => ({ meta: [{ title: "Facilities — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Facilities" subtitle="A purpose-built campus designed to support every dimension of student life.">
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {facilities.map((f) => (
          <div key={f.title} className="bg-card border border-border rounded-xl p-6 shadow-soft">
            <div className="h-10 w-10 rounded-lg bg-primary text-primary-foreground grid place-items-center"><f.icon className="h-5 w-5" /></div>
            <h3 className="mt-4 font-serif text-lg font-bold text-primary">{f.title}</h3>
            <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </div>
    </PortalPageShell>
  ),
});
