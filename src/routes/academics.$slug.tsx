import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { ImagePlaceholder } from "@/components/site/ImagePlaceholder";
import { ArrowRight, CheckCircle2 } from "lucide-react";

type Division = {
  title: string;
  age: string;
  curriculum: string;
  subjects: string[];
  approach: string;
  assessment: string;
  extras: string[];
};

const data: Record<string, Division> = {
  "early-years": {
    title: "Early Years",
    age: "Ages 3 – 5",
    curriculum: "Our Early Years programme blends the best of internationally recognized early childhood pedagogy with a nurturing, play-based environment.",
    subjects: ["Literacy & Phonics", "Numeracy", "World Around Us", "Creative Arts", "Physical Development", "Personal & Social"],
    approach: "Hands-on discovery, structured play, and small-group learning that develops curiosity, language and confidence.",
    assessment: "Continuous observation and developmental milestones shared with parents through regular reports.",
    extras: ["Music", "Movement", "Story time", "Outdoor exploration"],
  },
  primary: {
    title: "Primary School",
    age: "Ages 6 – 10",
    curriculum: "Our Primary programme follows an internationally aligned framework, building skills and confidence in English, Mathematics and Science alongside a broad subject base.",
    subjects: ["English", "Mathematics", "Science", "ICT", "Social Studies", "Art", "Music", "Physical Education", "Amharic"],
    approach: "Active learning, collaborative projects, and inquiry-based lessons taught by specialist teachers.",
    assessment: "Regular checkpoint assessments and ongoing classroom evidence build a clear picture of progression.",
    extras: ["Clubs", "Sports", "Reading challenges", "Field trips"],
  },
  middle: {
    title: "Middle School",
    age: "Ages 11 – 14",
    curriculum: "Our Lower Secondary programme stretches students into deeper academic study while building independence.",
    subjects: ["English", "Mathematics", "Sciences", "Humanities", "ICT", "Languages", "Arts", "PE"],
    approach: "Subject specialists, structured study skills and a steady transition into the IGCSE pathway.",
    assessment: "Checkpoint examinations, formative tasks and termly assessments inform progress.",
    extras: ["Debate", "Robotics", "Music ensemble", "Sports teams"],
  },
  high: {
    title: "High School",
    age: "Ages 15 – 18",
    curriculum: "Cambridge IGCSE followed by AS & A Level — qualifications recognized by leading universities worldwide.",
    subjects: ["English Language & Literature", "Mathematics", "Sciences", "Business", "Economics", "Computer Science", "Humanities", "Languages"],
    approach: "Rigorous academics paired with university guidance, leadership opportunities and service learning.",
    assessment: "External Cambridge examinations alongside coursework, mock examinations and predicted grades.",
    extras: ["Model UN", "STEM clubs", "Community service", "University fairs"],
  },
};

export const Route = createFileRoute("/academics/$slug")({
  loader: ({ params }) => {
    const d = data[params.slug];
    if (!d) throw notFound();
    return { division: d };
  },
  head: ({ loaderData }) => ({
    meta: [
      { title: `${loaderData?.division.title ?? "Division"} — Zega International` },
      { name: "description", content: loaderData?.division.curriculum ?? "" },
    ],
  }),
  errorComponent: ({ error }) => <div className="container-page py-20">{error.message}</div>,
  notFoundComponent: () => <div className="container-page py-20">Division not found.</div>,
  component: DivisionPage,
});

function DivisionPage() {
  const { division } = Route.useLoaderData();
  return (
    <div>
      <section className="bg-primary text-primary-foreground">
        <div className="container-page py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <div className="eyebrow text-accent">{division.age}</div>
            <h1 className="mt-3 font-serif text-4xl md:text-5xl font-bold">{division.title}</h1>
            <p className="mt-5 opacity-85 max-w-lg leading-relaxed">{division.curriculum}</p>
          </div>
          <div className="rounded-2xl overflow-hidden shadow-card">
            <ImagePlaceholder label={division.title} ratio="4/3" />
          </div>
        </div>
      </section>

      <section className="container-page py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow">Subjects</div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-primary">What students study</h2>
          <ul className="mt-5 grid grid-cols-2 gap-2">
            {division.subjects.map((s: string) => (
              <li key={s} className="flex items-center gap-2 text-sm text-foreground/85">
                <CheckCircle2 className="h-4 w-4 text-accent" /> {s}
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="eyebrow">Approach</div>
          <h2 className="mt-2 font-serif text-2xl font-bold text-primary">How we teach</h2>
          <p className="mt-3 text-foreground/85 leading-relaxed">{division.approach}</p>
        </div>
      </section>

      <section className="bg-surface">
        <div className="container-page py-16 grid lg:grid-cols-2 gap-10">
          <div>
            <div className="eyebrow">Assessment</div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Progress & evidence</h2>
            <p className="mt-3 text-foreground/85 leading-relaxed">{division.assessment}</p>
          </div>
          <div>
            <div className="eyebrow">Beyond the Classroom</div>
            <h2 className="mt-2 font-serif text-2xl font-bold text-primary">Co-curricular life</h2>
            <ul className="mt-3 flex flex-wrap gap-2">
              {division.extras.map((e: string) => (
                <li key={e} className="px-3 py-1.5 text-xs font-medium rounded-full bg-card border border-border">{e}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="container-page py-16">
        <div className="rounded-2xl bg-primary text-primary-foreground p-10 flex flex-col md:flex-row items-center justify-between gap-5">
          <h3 className="font-serif text-2xl">Ready to apply for {division.title}?</h3>
          <Link to="/admissions" className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-accent text-accent-foreground font-semibold">
            Apply Now <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
