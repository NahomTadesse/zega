import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { useState } from "react";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Zega International School" },
      { name: "description", content: "Photos of campus life, classrooms, activities and events at Zega International School." },
    ],
  }),
  component: GalleryPage,
});

const items = [
  { label: "School Compound", category: "Campus" },
  { label: "Modern Classrooms", category: "Classrooms" },
  { label: "Art & T-Shirt Imprinting", category: "Activities" },
  { label: "Gymnasium", category: "Sports" },
  { label: "Career Day", category: "Events" },
  { label: "ZIS Culture Day", category: "Celebrations" },
  { label: "Primary Level Classrooms", category: "Classrooms" },
  { label: "Outdoor Spaces", category: "Campus" },
  { label: "Creative Day", category: "Activities" },
  { label: "Sports Day", category: "Sports" },
  { label: "Graduation Ceremony", category: "Celebrations" },
  { label: "Library", category: "Campus" },
];

const categories = ["All", "Campus", "Classrooms", "Activities", "Sports", "Events", "Celebrations"] as const;

function GalleryPage() {
  const [active, setActive] = useState<(typeof categories)[number]>("All");
  const visible = active === "All" ? items : items.filter((i) => i.category === active);

  return (
    <div>
      <PageHero eyebrow="Gallery" title="Life at Zega in pictures." subtitle="A glimpse of our campus, classrooms, events and the everyday moments that make up school life." />

      <section className="container-page py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setActive(c)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition ${
                active === c
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card border-border text-foreground/75 hover:border-accent"
              }`}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((g, i) => (
            <figure key={i} className="bg-card border border-border rounded-xl overflow-hidden shadow-soft">
              <ImagePlaceholder label={g.label} ratio="4/3" />
              <figcaption className="p-4">
                <div className="text-[10px] uppercase tracking-widest text-accent font-semibold">{g.category}</div>
                <div className="text-sm font-medium mt-0.5">{g.label}</div>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </div>
  );
}
