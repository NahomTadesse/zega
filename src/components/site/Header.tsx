import { Link } from "@tanstack/react-router";
import { Menu, Phone, Mail, X } from "lucide-react";
import { useState } from "react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/academics", label: "Academics" },
  { to: "/admissions", label: "Admissions" },
  { to: "/news", label: "News & Calendar" },
  { to: "/portal", label: "Portal" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/85 backdrop-blur-md border-b border-border">
      {/* Top bar */}
      <div className="hidden md:block bg-primary text-primary-foreground text-xs">
        <div className="container-page flex h-9 items-center justify-between">
          <div className="flex items-center gap-5">
            <a href="tel:+251994729293" className="flex items-center gap-1.5 hover:text-accent transition">
              <Phone className="h-3.5 w-3.5" /> +251 99 472 9293
            </a>
            <a href="mailto:contact@zegainternational.school" className="flex items-center gap-1.5 hover:text-accent transition">
              <Mail className="h-3.5 w-3.5" /> contact@zegainternational.school
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/portal" className="hover:text-accent transition">Portal Login</Link>
          </div>
        </div>
      </div>

      {/* Main nav */}
      <div className="container-page flex h-16 md:h-20 items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-md bg-primary text-primary-foreground grid place-items-center font-serif font-bold text-lg shadow-soft">Z</div>
          <div className="leading-tight">
            <div className="font-serif text-base md:text-lg font-bold text-primary">Zega International</div>
            <div className="text-[10px] md:text-xs text-muted-foreground tracking-widest uppercase">International School · Addis Ababa</div>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              activeProps={{ className: "text-primary" }}
              inactiveProps={{ className: "text-foreground/75 hover:text-primary" }}
              className="px-3 py-2 text-sm font-medium transition-colors"
            >
              {n.label}
            </Link>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-2">
          <Link to="/admissions" className="px-4 py-2 rounded-md text-sm font-semibold bg-accent text-accent-foreground hover:opacity-90 transition shadow-soft">
            Apply Now
          </Link>
        </div>

        <button
          className="lg:hidden p-2 text-foreground"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="lg:hidden border-t border-border bg-background">
          <nav className="container-page py-4 flex flex-col gap-1">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                activeOptions={{ exact: n.to === "/" }}
                activeProps={{ className: "bg-secondary text-primary" }}
                className="px-3 py-2.5 rounded-md text-sm font-medium text-foreground/80"
              >
                {n.label}
              </Link>
            ))}
            <div className="pt-3">
              <Link to="/admissions" onClick={() => setOpen(false)} className="block text-center px-4 py-2.5 rounded-md text-sm font-semibold bg-accent text-accent-foreground">
                Apply Now
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
