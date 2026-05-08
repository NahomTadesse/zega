import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, AdminTable, Badge, PageTitle, StatCard } from "@/components/admin/AdminUI";
import { GraduationCap, Users, Receipt, ShieldCheck, ArrowUpRight } from "lucide-react";

export const Route = createFileRoute("/admin/")({
  component: Dashboard,
});

function Dashboard() {
  return (
    <div>
      <PageTitle title="Dashboard" subtitle="Overview of school operations and recent activity." />

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-8">
        <StatCard label="Total Students" value="842" hint="+24 this term" icon={GraduationCap} tone="primary" />
        <StatCard label="Faculty" value="68" hint="4 new hires" icon={Users} tone="accent" />
        <StatCard label="Open Applications" value="37" hint="12 awaiting review" icon={ShieldCheck} tone="success" />
        <StatCard label="Outstanding Fees" value="ETB 1.2M" hint="Across 28 families" icon={Receipt} tone="muted" />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <AdminCard
            title="Recent Admissions"
            action={<a href="/admin/admissions" className="text-xs font-medium text-primary inline-flex items-center gap-1">View all <ArrowUpRight className="h-3 w-3" /></a>}
          >
            <AdminTable
              headers={["Applicant", "Division", "Submitted", "Status"]}
              rows={[
                ["Liya Bekele", "Primary", "2 hours ago", <Badge tone="warn">Pending review</Badge>],
                ["Yonas Alemu", "High School", "Yesterday", <Badge tone="info">Interview scheduled</Badge>],
                ["Sara Tesfaye", "Middle School", "2 days ago", <Badge tone="success">Offer sent</Badge>],
                ["Henok Girma", "Early Years", "3 days ago", <Badge tone="success">Enrolled</Badge>],
                ["Mariam Kedir", "Primary", "4 days ago", <Badge tone="danger">Declined</Badge>],
              ]}
            />
          </AdminCard>
        </div>
        <AdminCard title="Upcoming Events">
          <ul className="space-y-4">
            {[
              { title: "ZIS Culture Day", date: "Fri, Nov 21" },
              { title: "Parent-Teacher Conference", date: "Sat, Nov 29" },
              { title: "Career Day", date: "Wed, Dec 10" },
              { title: "End of Term Exams", date: "Mon, Dec 15" },
            ].map((e) => (
              <li key={e.title} className="flex items-start gap-3">
                <div className="h-10 w-10 rounded-md bg-accent/15 text-accent grid place-items-center text-xs font-bold">
                  {e.date.split(" ")[1].replace(",", "")}
                </div>
                <div>
                  <div className="text-sm font-semibold">{e.title}</div>
                  <div className="text-xs text-muted-foreground">{e.date}</div>
                </div>
              </li>
            ))}
          </ul>
        </AdminCard>
      </div>
    </div>
  );
}
