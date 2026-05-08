import { Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { ReactNode } from "react";
import { PageHero } from "./PageHero";

export function PortalPageShell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: ReactNode;
}) {
  return (
    <div>
      <PageHero eyebrow="Portal" title={title} subtitle={subtitle} />
      <div className="container-page py-12">
        <Link to="/portal" className="inline-flex items-center gap-1.5 text-sm text-primary hover:text-accent mb-8">
          <ArrowLeft className="h-4 w-4" /> Back to Portal
        </Link>
        {children}
      </div>
    </div>
  );
}

export function DataTable({ headers, rows }: { headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-xl border border-border bg-card shadow-soft">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            {headers.map((h) => (
              <th key={h} className="text-left px-5 py-3 font-semibold text-foreground">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-surface/60">
              {r.map((c, j) => (
                <td key={j} className="px-5 py-3 text-foreground/85">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function EmptyNotice({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-xl border border-dashed border-border bg-surface p-10 text-center">
      <h3 className="font-serif text-xl text-primary font-bold">{title}</h3>
      <p className="mt-2 text-sm text-muted-foreground max-w-md mx-auto">{body}</p>
    </div>
  );
}
