import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";

export const Route = createFileRoute("/admissions")({
  head: () => ({
    meta: [
      { title: "Admissions — Zega International School" },
      { name: "description", content: "Apply for the 2025/26 academic year. Early Years to A Level, in Addis Ababa." },
      { property: "og:title", content: "Admissions Open · 2025/26" },
      { property: "og:description", content: "Step-by-step admissions process for Zega International School." },
    ],
  }),
  component: AdmissionsPage,
});

const steps = [
  { n: "01", t: "Inquire", d: "Submit an enquiry or book a campus visit to learn about our programme." },
  { n: "02", t: "Apply", d: "Complete the online application form for your child's division." },
  { n: "03", t: "Assess", d: "Age-appropriate assessment and a family interview." },
  { n: "04", t: "Offer", d: "Receive an offer of admission and complete enrolment." },
];

const docs = [
  "Completed application form",
  "Birth certificate (copy)",
  "Most recent school report",
  "Passport-size photographs",
  "Parent/guardian ID copy",
  "Vaccination record",
];

const faqs = [
  { q: "When does the academic year begin?", a: "Our academic year follows the published 2025/2026 academic calendar, available under News & Calendar." },
  { q: "Do you offer the full Cambridge pathway?", a: "Yes. We deliver Cambridge Primary, Lower Secondary, IGCSE and AS & A Level under one campus." },
  { q: "Are parents involved in the school?", a: "Yes. Zega is parent-owned through Zega Education & Training Services Share Company, with parent-shareholders involved in governance." },
  { q: "Where is the school located?", a: "Lideta, behind the Federal Court, in Addis Ababa, Ethiopia." },
];

function AdmissionsPage() {
  return (
    <div>
      <PageHero
        eyebrow="Admissions Open · 2025/26"
        title="Apply to join Zega International School."
        subtitle="A clear, transparent admissions process built around families. We welcome applications from Early Years through A Level."
      />

      <section className="container-page py-16 grid lg:grid-cols-3 gap-10">
        <div>
          <div className="eyebrow">Who can apply</div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Open to families committed to a global education</h2>
        </div>
        <div className="lg:col-span-2 text-foreground/85 leading-relaxed">
          We welcome students of any nationality from age 3 through Year 13. Admission is
          based on an age-appropriate assessment and a family conversation — not on prior
          background. Our programme is designed for learners who are curious, motivated and
          ready to grow.
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-16">
          <div className="eyebrow">Process</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Four simple steps</h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((s) => (
              <div key={s.n} className="bg-card border border-border rounded-xl p-6 shadow-soft">
                <div className="font-serif text-3xl text-accent">{s.n}</div>
                <h3 className="mt-2 font-serif text-xl text-primary font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow">Required Documents</div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Have these ready</h2>
          <ul className="mt-5 space-y-2">
            {docs.map((d) => (
              <li key={d} className="flex items-center gap-2 text-foreground/85"><CheckCircle2 className="h-4 w-4 text-accent" /> {d}</li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Fees</div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Tuition & payment</h2>
          <p className="mt-3 text-foreground/85 leading-relaxed">
            A detailed tuition schedule for the 2025/26 academic year is available on
            request and through the parent portal. Please contact admissions for the
            current fee structure for your child's division.
          </p>
          <Link to="/portal" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-accent">
            <FileText className="h-4 w-4" /> View tuition information in Portal
          </Link>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-16">
          <div className="eyebrow">FAQ</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Frequently asked</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="bg-card border border-border rounded-xl p-6">
                <h3 className="font-semibold text-foreground">{f.q}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-6 shadow-card">
          <div>
            <h3 className="font-serif text-2xl md:text-3xl font-bold">Ready to apply?</h3>
            <p className="opacity-80 mt-2">Online admissions are open for the 2025/26 session.</p>
          </div>
          <div className="flex gap-3">
            <Link to="/visit" className="px-6 py-3 rounded-md border border-white/40 hover:bg-white/10">Book a Visit</Link>
            <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold">Apply Now <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </div>
      </section>
    </div>
  );
}
