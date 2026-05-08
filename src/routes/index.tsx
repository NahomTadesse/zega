import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, Building2, Calendar, GraduationCap, Sparkles, Users } from "lucide-react";
import hero from "@/assets/hero-campus.jpg";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zega International School — Addis Ababa" },
      { name: "description", content: "Parent-owned international school in Addis Ababa offering Early Years through A Level. Admissions open for 2025/26." },
    ],
  }),
  component: Home,
});

const facts = [
  { icon: GraduationCap, title: "Cambridge Curriculum", text: "Internationally recognized IGCSE & A Level pathway." },
  { icon: BookOpen, title: "Early Years to A Level", text: "Continuous learning journey under one campus." },
  { icon: Users, title: "Parent-Owned Governance", text: "Founded and shaped by parent shareholders." },
  { icon: Sparkles, title: "Holistic Learning", text: "Academics, character, and community service." },
  { icon: Building2, title: "Addis Ababa Campus", text: "Lideta — purpose-built learning environment." },
];

const programs = [
  { slug: "early-years", title: "Early Years", age: "Ages 3 – 5", desc: "Play-based foundations in literacy, numeracy and curiosity." },
  { slug: "primary", title: "Primary School", age: "Ages 6 – 10", desc: "Builds confident, creative learners through inquiry and structured study." },
  { slug: "middle", title: "Middle School", age: "Ages 11 – 14", desc: "Develops independent thinkers ready for the demands of high school." },
  { slug: "high", title: "High School", age: "Ages 15 – 18", desc: "IGCSE and A Level qualifications recognized by global universities." },
];

const news = [
  { tag: "Announcement", title: "Admissions open for the 2025/26 academic year", date: "Now accepting applications" },
  { tag: "Academic", title: "2025/2026 Academic Calendar published", date: "Download available" },
  { tag: "Community", title: "Parent shareholder meeting recap", date: "Quarterly update" },
];

const events = [
  { title: "ZIS Culture Day", date: "Coming soon", place: "School Compound" },
  { title: "Drawing & T-Shirt Imprinting", date: "Coming soon", place: "School Compound" },
  { title: "Career Day", date: "Coming soon", place: "School Compound" },
];

const gallery = [
  "Career Day", "Classrooms", "School Compound", "Gymnasium", "Culture Day", "Student Activities",
];


function Home() {
  return (
    <div>
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0">
          <img src={hero} alt="Zega International School campus" className="h-full w-full object-cover" width={1920} height={1280} />
          <div className="absolute inset-0 bg-gradient-to-r from-primary/90 via-primary/70 to-primary/30" />
        </div>
        <div className="relative container-page py-24 md:py-36 text-primary-foreground">
          <div className="eyebrow text-accent">International School · Addis Ababa</div>
          <h1 className="mt-4 font-serif text-4xl md:text-6xl lg:text-7xl font-bold max-w-3xl leading-[1.05]">
            Where global thinking meets Ethiopian roots.
          </h1>
          <p className="mt-6 text-base md:text-lg max-w-xl opacity-90 leading-relaxed">
            A parent-owned international school nurturing global citizens through academic
            excellence, integrity of character, and community service.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold shadow-soft hover:opacity-90 transition">
              Apply Now <ArrowRight className="h-4 w-4" />
            </Link>
            <Link to="/visit" className="inline-flex items-center gap-2 px-6 py-3 rounded-md border border-white/40 text-primary-foreground hover:bg-white/10 transition">
              Book a Visit
            </Link>
          </div>
        </div>
      </section>

      {/* FACTS */}
      <section className="bg-surface border-y border-border">
        <div className="container-page py-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
          {facts.map((f) => (
            <div key={f.title} className="flex gap-3">
              <div className="h-10 w-10 shrink-0 rounded-lg bg-accent/15 text-accent grid place-items-center">
                <f.icon className="h-5 w-5" />
              </div>
              <div>
                <div className="font-semibold text-sm">{f.title}</div>
                <div className="text-xs text-muted-foreground mt-0.5">{f.text}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROGRAMS */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="eyebrow">Our Programs</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-primary">A continuous learning journey</h2>
          </div>
          <Link to="/academics" className="text-sm font-medium text-primary hover:text-accent inline-flex items-center gap-1">
            All Academics <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {programs.map((p) => (
            <Link key={p.slug} to="/academics/$slug" params={{ slug: p.slug }} className="group rounded-xl overflow-hidden bg-card border border-border shadow-soft hover:shadow-card transition">
              <ImagePlaceholder label={p.title} ratio="4/3" />
              <div className="p-5">
                <div className="text-xs font-semibold text-accent">{p.age}</div>
                <h3 className="font-serif text-xl font-bold text-primary mt-1">{p.title}</h3>
                <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{p.desc}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary group-hover:text-accent">
                  View Program <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* NEWS + EVENTS */}
      <section className="bg-surface">
        <div className="container-page py-20 grid gap-10 lg:grid-cols-2">
          <div>
            <div className="eyebrow">Latest News</div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary">From our community</h2>
            <ul className="mt-6 space-y-4">
              {news.map((n) => (
                <li key={n.title} className="bg-card border border-border rounded-lg p-5 hover:shadow-soft transition">
                  <div className="text-xs font-semibold text-accent">{n.tag}</div>
                  <div className="mt-1 font-semibold text-foreground">{n.title}</div>
                  <div className="text-xs text-muted-foreground mt-1">{n.date}</div>
                </li>
              ))}
            </ul>
            <Link to="/news" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
              All news <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div>
            <div className="eyebrow">Upcoming Events</div>
            <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Mark your calendar</h2>
            <ul className="mt-6 space-y-4">
              {events.map((e) => (
                <li key={e.title} className="bg-card border border-border rounded-lg p-5 flex gap-4 items-start hover:shadow-soft transition">
                  <div className="h-12 w-12 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{e.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">{e.date} · {e.place}</div>
                  </div>
                </li>
              ))}
            </ul>
            <Link to="/news" className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-primary hover:text-accent">
              See all events <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* GALLERY */}
      <section className="container-page py-20">
        <div className="flex items-end justify-between mb-10 gap-6 flex-wrap">
          <div>
            <div className="eyebrow">Gallery</div>
            <h2 className="mt-2 font-serif text-3xl md:text-4xl font-bold text-primary">Life at Zega</h2>
          </div>
        </div>
        <div className="grid gap-3 grid-cols-2 md:grid-cols-3">
          {gallery.map((label) => (
            <figure key={label} className="relative overflow-hidden rounded-xl group">
              <ImagePlaceholder label={label} ratio="square" />
            </figure>
          ))}
        </div>
      </section>

      {/* ADMISSIONS BANNER */}
      <section className="container-page pb-20">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-14 grid md:grid-cols-[1fr_auto] items-center gap-6 shadow-card overflow-hidden relative">
          <div className="absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />
          <div className="relative">
            <div className="eyebrow text-accent">Admissions Open · 2025/26</div>
            <h2 className="mt-3 font-serif text-3xl md:text-4xl font-bold">Begin your child's journey with us today.</h2>
            <p className="mt-3 opacity-85 max-w-xl">Apply online and join a learning community built by parents, for the future of every student.</p>
          </div>
          <Link to="/admissions" className="relative inline-flex items-center gap-2 px-7 py-3.5 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90 transition">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
