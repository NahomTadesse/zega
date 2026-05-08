import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/PageHero";
import { Mail, MapPin, Phone } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zega International School" },
      { name: "description", content: "Contact Zega International School in Lideta, Addis Ababa. Phone, email and location." },
      { property: "og:title", content: "Contact Zega International" },
      { property: "og:description", content: "Get in touch with our admissions and front office team." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <div>
      <PageHero eyebrow="Contact" title="We'd love to hear from you." subtitle="Get in touch with our admissions and front office team — or come visit our Lideta campus." />

      <section className="container-page py-16 grid lg:grid-cols-2 gap-10">
        <div>
          <div className="eyebrow">Get in touch</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Contact details</h2>
          <ul className="mt-8 space-y-5">
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0"><MapPin className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">Address</div>
                <div className="text-foreground/80 text-sm">Lideta, Behind Federal Court, Addis Ababa, Ethiopia</div>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0"><Phone className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">Phone</div>
                <a href="tel:+251994729293" className="text-foreground/80 text-sm hover:text-primary">+251 99 472 9293</a>
              </div>
            </li>
            <li className="flex gap-4">
              <div className="h-11 w-11 rounded-lg bg-primary text-primary-foreground grid place-items-center shrink-0"><Mail className="h-5 w-5" /></div>
              <div>
                <div className="font-semibold">Email</div>
                <a href="mailto:contact@zegainternational.school" className="text-foreground/80 text-sm hover:text-primary">contact@zegainternational.school</a>
              </div>
            </li>
          </ul>

          <div className="mt-10 bg-surface rounded-xl p-6 border border-border">
            <div className="text-sm font-semibold">Office hours</div>
            <div className="mt-2 text-sm text-muted-foreground">Monday – Friday · 8:00 AM – 4:30 PM</div>
          </div>
        </div>

        <div>
          <div className="eyebrow">Find us</div>
          <h2 className="mt-2 font-serif text-3xl font-bold text-primary">Our campus</h2>
          <div className="mt-6 aspect-[4/3] rounded-2xl overflow-hidden border border-border shadow-soft">
            <iframe
              title="Zega International School location"
              src="https://www.openstreetmap.org/export/embed.html?bbox=38.72%2C9.00%2C38.76%2C9.04&amp;layer=mapnik"
              className="w-full h-full"
              loading="lazy"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
