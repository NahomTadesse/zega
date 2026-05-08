import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Calendar, Download, MapPin } from "lucide-react";

export const Route = createFileRoute("/news")({
  head: () => ({
    meta: [
      { title: "News & Calendar — Zega International School" },
      { name: "description", content: "Academic calendar, events and notices from Zega International School." },
      { property: "og:title", content: "News & Calendar" },
      { property: "og:description", content: "Stay up to date with the academic calendar and upcoming events." },
    ],
  }),
  component: NewsPage,
});

const events = [
  { title: "ZIS Culture Day", date: "Coming soon", place: "School Compound", desc: "A full day celebrating Ethiopia's diverse cultures with student performances, food and exhibitions." },
  { title: "Drawing Competition & T-Shirt Imprinting", date: "Coming soon", place: "School Compound", desc: "Creative arts day open to all primary and middle school students." },
  { title: "Career Day", date: "Coming soon", place: "School Compound", desc: "Industry professionals meet our high school students for one-on-one career conversations." },
];

const notices = [
  { tag: "General", title: "Welcome to the new academic year", date: "2025/26" },
  { tag: "Reminder", title: "Submit medical forms before term begins", date: "Ongoing" },
];

function NewsPage() {
  return (
    <div>
      <PageHero eyebrow="News & Calendar" title="Stay connected to school life." subtitle="Find the academic calendar, upcoming events and important notices in one place." />

      <section className="container-page py-16">
        <div className="eyebrow">Academic Calendar</div>
        <h2 className="mt-2 font-serif text-3xl font-bold text-primary">2025 / 2026</h2>
        <div className="mt-6 bg-card border border-border rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 shadow-soft">
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground grid place-items-center"><Calendar className="h-5 w-5" /></div>
            <div>
              <div className="font-semibold">2025/2026 Academic Calendar</div>
              <div className="text-sm text-muted-foreground">Full term dates, holidays and key academic events.</div>
            </div>
          </div>
          <a href="#" className="inline-flex items-center gap-2 px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold">
            <Download className="h-4 w-4" /> Download PDF
          </a>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-16">
          <div className="eyebrow">Upcoming Events</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">What's coming up</h2>
          <div className="mt-8 grid gap-6 md:grid-cols-3">
            {events.map((e) => (
              <article key={e.title} className="bg-card rounded-xl border border-border overflow-hidden shadow-soft hover:shadow-card transition">
                <div className="aspect-[16/9] bg-gradient-to-br from-primary to-accent" />
                <div className="p-6">
                  <h3 className="font-serif text-xl font-bold text-primary">{e.title}</h3>
                  <div className="mt-2 text-xs text-muted-foreground flex items-center gap-3">
                    <span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {e.date}</span>
                    <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" /> {e.place}</span>
                  </div>
                  <p className="mt-3 text-sm text-foreground/80 leading-relaxed">{e.desc}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="eyebrow">Noticeboard</div>
        <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Important notices</h2>
        <ul className="mt-6 space-y-3">
          {notices.map((n) => (
            <li key={n.title} className="bg-card border border-border rounded-lg p-5 flex items-center justify-between gap-4">
              <div>
                <div className="text-xs font-semibold text-accent">{n.tag}</div>
                <div className="font-semibold mt-0.5">{n.title}</div>
              </div>
              <div className="text-xs text-muted-foreground">{n.date}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
