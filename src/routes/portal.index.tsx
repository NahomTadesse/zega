import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Users, GraduationCap, UserCog, ArrowRight, FileText, Calendar, Clipboard, BookOpen, Building, Receipt, Archive, Download } from "lucide-react";

export const Route = createFileRoute("/portal/")({
  head: () => ({
    meta: [
      { title: "Portal — Zega International School" },
      { name: "description", content: "Student, Parent and Teacher portals plus utility resources for the Zega community." },
      { property: "og:title", content: "Zega Portal" },
      { property: "og:description", content: "Logins, results, schedules and downloads for the school community." },
    ],
  }),
  component: PortalIndex,
});

const cards = [
  { icon: GraduationCap, title: "Student Portal", desc: "Access your timetable, exam routines and individual results.", items: ["Class Routine", "Exam Routine", "Individual Result", "Form Download"] },
  { icon: Users, title: "Parent Portal", desc: "Stay informed about fees, calendars and your child's progress.", items: ["Tuition Fees", "Student List", "Academic Calendar", "Notices"] },
  { icon: UserCog, title: "Teacher Portal", desc: "Manage rosters, schedules and grading workflows.", items: ["Teacher List", "Class Routine", "Result Entry", "Resources"] },
];

const utilities = [
  { to: "/portal/student-list", label: "Student List", icon: Users },
  { to: "/portal/teacher-list", label: "Teacher List", icon: UserCog },
  { to: "/portal/class-routine", label: "Class Routine", icon: Calendar },
  { to: "/portal/exam-routine", label: "Exam Routine", icon: Clipboard },
  { to: "/portal/individual-result", label: "Individual Result", icon: FileText },
  { to: "/portal/tuition-fees", label: "Tuition Fees", icon: Receipt },
  { to: "/portal/facilities", label: "Facilities", icon: Building },
  { to: "/portal/form-download", label: "Form Download", icon: Download },
  { to: "/portal/archive", label: "Archive", icon: Archive },
] as const;

function PortalIndex() {
  return (
    <div>
      <PageHero eyebrow="Portal" title="One place for the Zega community." subtitle="Sign in to your portal or use the quick links below to access schedules, results and downloads." />

      <section className="container-page py-16 grid gap-6 md:grid-cols-3">
        {cards.map((c) => (
          <div key={c.title} className="bg-card rounded-2xl border border-border p-7 shadow-soft hover:shadow-card transition flex flex-col">
            <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground grid place-items-center"><c.icon className="h-5 w-5" /></div>
            <h2 className="mt-5 font-serif text-2xl font-bold text-primary">{c.title}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{c.desc}</p>
            <ul className="mt-4 space-y-2 text-sm text-foreground/80 flex-1">
              {c.items.map((i) => <li key={i} className="flex items-center gap-2"><span className="h-1 w-1 rounded-full bg-accent" /> {i}</li>)}
            </ul>
            <button className="mt-6 inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold text-sm">
              Sign in <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        ))}
      </section>

      <section className="bg-surface">
        <div className="container-page py-16">
          <div className="eyebrow">Utility Pages</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Quick access</h2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            {utilities.map((u) => (
              <Link key={u.to} to={u.to} className="bg-card border border-border rounded-lg p-4 hover:border-accent transition flex items-center gap-3 group">
                <div className="h-9 w-9 rounded-md bg-secondary text-primary grid place-items-center"><u.icon className="h-4 w-4" /></div>
                <span className="text-sm font-medium flex-1">{u.label}</span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-accent transition" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl border border-border bg-card p-8 md:p-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <div>
            <BookOpen className="h-8 w-8 text-accent" />
            <h3 className="mt-3 font-serif text-2xl font-bold text-primary">Need help signing in?</h3>
            <p className="text-sm text-muted-foreground mt-1">Reach our front office for portal credentials or password resets.</p>
          </div>
          <Link to="/contact" className="px-5 py-2.5 rounded-md bg-primary text-primary-foreground text-sm font-semibold">Contact support</Link>
        </div>
      </section>
    </div>
  );
}
