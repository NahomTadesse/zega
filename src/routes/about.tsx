import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zega International School" },
      { name: "description", content: "Parent-owned international school in Addis Ababa focused on global citizenship, academic excellence, and character." },
      { property: "og:title", content: "About Zega International School" },
      { property: "og:description", content: "Founded by parents, educators, and socially conscious investors in Ethiopia." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div>
      <PageHero
        eyebrow="About Us"
        title="A school built by parents, for the future of every student."
        subtitle="Zega International School is a leading educational institution in Ethiopia, focused on global citizenship, academic excellence, character building, and holistic learning."
      />

      {/* Overview */}
      <section className="container-page py-20 grid lg:grid-cols-3 gap-12">
        <div>
          <div className="eyebrow">Overview</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Who we are</h2>
        </div>
        <div className="lg:col-span-2 text-foreground/85 leading-relaxed text-lg">
          We are an international school based in Addis Ababa, serving families
          from Early Years through A Level. Our mission is to develop confident, principled,
          globally-minded young people equipped to thrive in the world they will inherit.
        </div>
      </section>

      {/* Founding story */}
      <section className="bg-surface">
        <div className="container-page py-20">
          <div className="eyebrow">Our Story</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary max-w-2xl">Founded by parents who wanted more.</h2>
          <div className="mt-10 grid md:grid-cols-2 gap-8">
            {[
              { y: "Origin", t: "A parent-led initiative", d: "Founded by parents, educators and socially conscious investors through Zega Education & Training Services Share Company." },
              { y: "Governance", t: "Parent-shareholders involved", d: "Parents are not just customers — they participate in school governance and direction." },
              { y: "Motivation", t: "Quality without hidden costs", d: "Built to raise the bar on quality while reducing the hidden costs that burden Ethiopian families." },
              { y: "Voice", t: "Stronger voice for families", d: "A school where parents and students have a real say in how their education is shaped." },
            ].map((s) => (
              <div key={s.t} className="bg-card rounded-xl border border-border p-6 shadow-soft">
                <div className="text-xs font-semibold text-accent tracking-widest uppercase">{s.y}</div>
                <h3 className="mt-2 font-serif text-xl text-primary font-bold">{s.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Educational model */}
      <section className="container-page py-20 grid lg:grid-cols-3 gap-12">
        <div>
          <div className="eyebrow">Educational Model</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Cambridge at our core</h2>
        </div>
        <div className="lg:col-span-2 space-y-4 text-foreground/85 leading-relaxed">
          <p>We deliver the Cambridge IGCSE and AS & A Level curriculum, recognized by leading universities worldwide.</p>
          <p>Our classrooms blend technology, innovation and critical thinking with the ethical values that prepare students to lead in their communities and beyond.</p>
        </div>
      </section>

      {/* Vision */}
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-20 text-center">
          <div className="eyebrow text-accent">Our Vision</div>
          <p className="mt-4 font-serif text-2xl md:text-3xl max-w-3xl mx-auto leading-snug">
            “To be a leading international private school in Ethiopia — nurturing global citizens
            with academic excellence, integrity of character, and a spirit of community service.”
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-20">
        <div className="rounded-2xl border border-border bg-card p-10 md:p-14 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-soft">
          <div>
            <div className="eyebrow">Admissions 2025/26</div>
            <h3 className="mt-2 font-serif text-2xl md:text-3xl font-bold text-primary">Online admissions are open now.</h3>
          </div>
          <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
