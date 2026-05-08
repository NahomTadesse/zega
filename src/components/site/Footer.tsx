import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Youtube } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-24 bg-primary text-primary-foreground">
      <div className="container-page py-14 grid gap-10 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-md bg-accent text-accent-foreground grid place-items-center font-serif font-bold text-lg">Z</div>
            <div>
              <div className="font-serif text-lg font-bold">Zega International School</div>
              <div className="text-xs opacity-75 tracking-widest uppercase">Parent-Owned · Addis Ababa</div>
            </div>
          </div>
          <p className="mt-5 text-sm opacity-80 max-w-md leading-relaxed">
            A leading international private school in Ethiopia nurturing global citizens
            with academic excellence, integrity of character, and a spirit of community service.
          </p>
        </div>

        <div>
          <h4 className="font-serif text-base mb-4">Explore</h4>
          <ul className="space-y-2 text-sm opacity-85">
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/academics" className="hover:text-accent">Academics</Link></li>
            <li><Link to="/admissions" className="hover:text-accent">Admissions</Link></li>
            <li><Link to="/news" className="hover:text-accent">News & Events</Link></li>
            <li><Link to="/gallery" className="hover:text-accent">Gallery</Link></li>
            <li><Link to="/portal" className="hover:text-accent">Portal</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact Us</Link></li>
          </ul>
        </div>

        <div>
          <h4 className="font-serif text-base mb-4">Get in touch</h4>
          <ul className="space-y-3 text-sm opacity-85">
            <li className="flex gap-2"><MapPin className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> Lideta, Behind Federal Court, Addis Ababa, Ethiopia</li>
            <li className="flex gap-2"><Phone className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> +251 99 472 9293</li>
            <li className="flex gap-2"><Mail className="h-4 w-4 mt-0.5 shrink-0 text-accent" /> contact@zegainternational.school</li>
          </ul>
          <div className="flex gap-3 mt-5">
            {[Facebook, Instagram, Linkedin, Youtube].map((I, i) => (
              <a key={i} href="#" className="h-9 w-9 grid place-items-center rounded-full bg-white/10 hover:bg-accent hover:text-accent-foreground transition" aria-label="social">
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-page py-5 text-xs opacity-70 flex flex-col sm:flex-row justify-between gap-2">
          <p>© {new Date().getFullYear()} Zega International School. All rights reserved.</p>
          <p>Early Years · Primary · Middle · High School</p>
        </div>
      </div>
    </footer>
  );
}
