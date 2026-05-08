import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { useState } from "react";

export const Route = createFileRoute("/visit")({
  head: () => ({
    meta: [
      { title: "Book a Visit — Zega International School" },
      { name: "description", content: "Schedule a campus visit at Zega International School in Addis Ababa." },
    ],
  }),
  component: VisitPage,
});

function VisitPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div>
      <PageHero eyebrow="Book a Visit" title="Come and see Zega in person." subtitle="Schedule a visit and we will confirm your appointment by phone or email." />

      <section className="container-page py-16 max-w-3xl">
        {submitted ? (
          <div className="bg-card border border-border rounded-2xl p-10 text-center shadow-soft">
            <h2 className="font-serif text-2xl text-primary font-bold">Thank you!</h2>
            <p className="mt-2 text-muted-foreground">We have received your request and will be in touch shortly.</p>
          </div>
        ) : (
          <form
            onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }}
            className="bg-card border border-border rounded-2xl p-8 md:p-10 shadow-soft grid gap-5"
          >
            <Field label="Full Name" name="name" required />
            <div className="grid sm:grid-cols-2 gap-5">
              <Field label="Phone" name="phone" type="tel" required />
              <Field label="ID Number" name="id" />
            </div>
            <div className="grid sm:grid-cols-3 gap-5">
              <Field label="Number of persons" name="persons" type="number" />
              <Field label="In time" name="in" type="time" />
              <Field label="Out time" name="out" type="time" />
            </div>
            <Field label="Visit date" name="date" type="date" />
            <div>
              <label className="text-sm font-medium block mb-1.5">Attach file (optional)</label>
              <input type="file" className="block w-full text-sm file:mr-3 file:py-2 file:px-4 file:rounded-md file:border-0 file:bg-primary file:text-primary-foreground" />
            </div>
            <div>
              <label className="text-sm font-medium block mb-1.5">Purpose of visit</label>
              <textarea rows={4} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
            </div>
            <button type="submit" className="px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold hover:opacity-90">
              Submit Request
            </button>
          </form>
        )}
      </section>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium block mb-1.5">{label}{required && <span className="text-destructive"> *</span>}</label>
      <input id={name} name={name} type={type} required={required} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}
