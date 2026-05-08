import { ReactNode } from "react";

export function PageTitle({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
      <div>
        <h1 className="font-serif text-3xl font-bold text-primary">{title}</h1>
        {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function StatCard({ label, value, hint, icon: Icon, tone = "primary" }: {
  label: string; value: string | number; hint?: string;
  icon?: React.ComponentType<{ className?: string }>;
  tone?: "primary" | "accent" | "success" | "muted";
}) {
  const toneCls = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/15 text-accent",
    success: "bg-emerald-500/10 text-emerald-600",
    muted: "bg-muted text-muted-foreground",
  }[tone];
  return (
    <div className="bg-card border border-border rounded-xl p-5 shadow-soft">
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</div>
          <div className="mt-1 font-serif text-2xl font-bold text-foreground">{value}</div>
          {hint && <div className="text-xs text-muted-foreground mt-1">{hint}</div>}
        </div>
        {Icon && <div className={`h-10 w-10 rounded-lg grid place-items-center ${toneCls}`}><Icon className="h-5 w-5" /></div>}
      </div>
    </div>
  );
}

export function AdminCard({ title, action, children }: { title?: string; action?: ReactNode; children: ReactNode }) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-soft">
      {(title || action) && (
        <div className="flex items-center justify-between p-5 border-b border-border">
          {title && <h2 className="font-serif text-lg font-bold text-primary">{title}</h2>}
          {action}
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}

export function AdminTable({ headers, rows }: { headers: ReactNode[]; rows: ReactNode[][] }) {
  return (
    <div className="overflow-x-auto -m-5">
      <table className="w-full text-sm">
        <thead className="bg-surface">
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="text-left px-5 py-3 font-semibold text-foreground whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r, i) => (
            <tr key={i} className="border-t border-border hover:bg-surface/50">
              {r.map((c, j) => (
                <td key={j} className="px-5 py-3 align-middle">{c}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export function Badge({ children, tone = "muted" }: { children: ReactNode; tone?: "muted" | "success" | "warn" | "danger" | "info" }) {
  const cls = {
    muted: "bg-muted text-muted-foreground",
    success: "bg-emerald-500/15 text-emerald-700",
    warn: "bg-amber-500/15 text-amber-700",
    danger: "bg-destructive/15 text-destructive",
    info: "bg-primary/10 text-primary",
  }[tone];
  return <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${cls}`}>{children}</span>;
}

export function PrimaryButton({ children, onClick, type = "button" }: { children: ReactNode; onClick?: () => void; type?: "button" | "submit" }) {
  return (
    <button type={type} onClick={onClick} className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-accent text-accent-foreground text-sm font-semibold hover:opacity-90 transition">
      {children}
    </button>
  );
}

export function GhostButton({ children, onClick }: { children: ReactNode; onClick?: () => void }) {
  return (
    <button onClick={onClick} className="inline-flex items-center gap-2 px-3 py-2 rounded-md border border-border text-sm font-medium hover:bg-secondary transition">
      {children}
    </button>
  );
}
