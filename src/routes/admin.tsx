import { createFileRoute, Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  LayoutDashboard, Users, GraduationCap, BookOpen, ClipboardList,
  FileBarChart, Receipt, CalendarDays, Image, FileText, Settings,
  ShieldCheck, LogOut, Menu, X, Bell, Search,
} from "lucide-react";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin · Zega International School" }] }),
  component: AdminLayout,
});

const NAV = [
  { to: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { to: "/admin/students", label: "Students", icon: GraduationCap, exact: false },
  { to: "/admin/teachers", label: "Teachers", icon: Users, exact: false },
  { to: "/admin/classes", label: "Classes", icon: BookOpen, exact: false },
  { to: "/admin/exams", label: "Exams", icon: ClipboardList, exact: false },
  { to: "/admin/results", label: "Results", icon: FileBarChart, exact: false },
  { to: "/admin/fees", label: "Tuition Fees", icon: Receipt, exact: false },
  { to: "/admin/admissions", label: "Admissions", icon: ShieldCheck, exact: false },
  { to: "/admin/events", label: "Events & News", icon: CalendarDays, exact: false },
  { to: "/admin/gallery", label: "Gallery", icon: Image, exact: false },
  { to: "/admin/forms", label: "Forms", icon: FileText, exact: false },
  { to: "/admin/settings", label: "Settings", icon: Settings, exact: false },
] as const;

function AdminLayout() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const path = useRouterState({ select: (s) => s.location.pathname });
  const navigate = useNavigate();
  const matches = useMemo(() => {
    if (!q.trim()) return [] as typeof NAV[number][];
    return NAV.filter((n) => n.label.toLowerCase().includes(q.toLowerCase()));
  }, [q]);

  return (
    <div className="min-h-screen bg-surface text-foreground -mt-px">
      {/* Mobile top bar */}
      <div className="lg:hidden sticky top-0 z-30 bg-card border-b border-border h-14 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <button onClick={() => setOpen(true)} aria-label="Open admin menu"><Menu className="h-5 w-5" /></button>
          <span className="font-serif font-bold text-primary">Admin</span>
        </div>
        <Link to="/" className="text-xs text-muted-foreground">Exit</Link>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`fixed lg:sticky top-0 inset-y-0 left-0 z-40 w-72 bg-primary text-primary-foreground transform transition-transform lg:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"} lg:h-screen flex flex-col`}>
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2">
              <div className="h-9 w-9 rounded-md bg-accent text-accent-foreground grid place-items-center font-serif font-bold">Z</div>
              <div>
                <div className="font-serif font-bold leading-tight">Zega Admin</div>
                <div className="text-[10px] uppercase tracking-widest opacity-70">School Console</div>
              </div>
            </Link>
            <button onClick={() => setOpen(false)} className="lg:hidden" aria-label="Close menu"><X className="h-5 w-5" /></button>
          </div>

          <nav className="flex-1 overflow-y-auto p-3 space-y-1">
            {NAV.map((n) => {
              const active = n.exact ? path === n.to : path.startsWith(n.to);
              return (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm transition ${
                    active ? "bg-white/15 text-accent font-semibold" : "text-primary-foreground/80 hover:bg-white/10 hover:text-primary-foreground"
                  }`}
                >
                  <n.icon className="h-4 w-4 shrink-0" />
                  <span>{n.label}</span>
                </Link>
              );
            })}
          </nav>

          <div className="p-3 border-t border-white/10">
            <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-md text-sm text-primary-foreground/80 hover:bg-white/10">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </aside>

        {open && <div className="fixed inset-0 bg-black/40 z-30 lg:hidden" onClick={() => setOpen(false)} />}

        {/* Main */}
        <div className="flex-1 min-w-0 lg:h-screen lg:overflow-y-auto">
          <header className="hidden lg:flex sticky top-0 z-20 bg-card/90 backdrop-blur border-b border-border h-16 items-center justify-between px-8">
            <div className="relative w-96 max-w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                value={q}
                onChange={(e) => setQ(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && matches[0]) { navigate({ to: matches[0].to }); setQ(""); } }}
                placeholder="Jump to a section…"
                className="w-full pl-9 pr-3 py-2 rounded-md border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              />
              {matches.length > 0 && (
                <div className="absolute mt-1 left-0 right-0 bg-card border border-border rounded-md shadow-card overflow-hidden z-30">
                  {matches.map((m) => (
                    <button key={m.to} onClick={() => { navigate({ to: m.to }); setQ(""); }} className="w-full text-left px-3 py-2 text-sm hover:bg-surface flex items-center gap-2">
                      <m.icon className="h-4 w-4 text-muted-foreground" /> {m.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="flex items-center gap-3">
              <button className="relative h-9 w-9 rounded-md hover:bg-secondary grid place-items-center" aria-label="Notifications">
                <Bell className="h-4 w-4" />
                <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-accent" />
              </button>
              <div className="flex items-center gap-2 pl-3 border-l border-border">
                <div className="h-8 w-8 rounded-full bg-accent text-accent-foreground grid place-items-center text-sm font-bold">A</div>
                <div className="leading-tight">
                  <div className="text-sm font-semibold">Admin User</div>
                  <div className="text-[10px] text-muted-foreground">Administrator</div>
                </div>
              </div>
            </div>
          </header>

          <div className="p-6 lg:p-10">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}
