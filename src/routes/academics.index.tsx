import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { ArrowRight } from "lucide-react";

export const Route = createFileRoute("/academics/")({
  head: () => ({
    meta: [
      { title: "Academics — Zega International School" },
      { name: "description", content: "From Early Years to A Level. Explore each school division." },
      { property: "og:title", content: "Academics at Zega International" },
      { property: "og:description", content: "Four divisions, one continuous learning journey." },
    ],
  }),
  component: AcademicsHub,
});

const divisions = [
  { slug: "early-years", title: "Early Years", age: "Ages 3 – 5", blurb: "Play-based foundations in literacy, numeracy and discovery." },
  { slug: "primary", title: "Primary School", age: "Ages 6 – 10", blurb: "Builds confident, creative learners through inquiry and structured study." },
  { slug: "middle", title: "Middle School", age: "Ages 11 – 14", blurb: "Develops independent thinkers ready for the demands of high school." },
  { slug: "high", title: "High School", age: "Ages 15 – 18", blurb: "IGCSE and A Level qualifications recognized by global universities." },
];

function AcademicsHub() {
  return (
    <div>
      <PageHero
        eyebrow="Academics"
        title="One school, four divisions, a single learning journey."
        subtitle="From the first day of Early Years to the final A Level exam, our students follow a coherent pathway designed for global universities and meaningful citizenship."
      />
      <section className="container-page py-20 grid gap-8 md:grid-cols-2">
        {divisions.map((d) => (
          <Link key={d.slug} to="/academics/$slug" params={{ slug: d.slug }} className="group bg-card rounded-2xl overflow-hidden border border-border shadow-soft hover:shadow-card transition flex flex-col">
            <ImagePlaceholder label={d.title} ratio="16/10" />
            <div className="p-6 flex-1 flex flex-col">
              <div className="text-xs font-semibold text-accent">{d.age}</div>
              <h2 className="font-serif text-2xl font-bold text-primary mt-1">{d.title}</h2>
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed flex-1">{d.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:text-accent">
                Explore Division <ArrowRight className="h-4 w-4" />
              </span>
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
}
