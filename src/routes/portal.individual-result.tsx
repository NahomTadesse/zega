import { createFileRoute } from "@tanstack/react-router";
import { PortalPageShell, EmptyNotice } from "@/components/site/PortalPageShell";

export const Route = createFileRoute("/portal/individual-result")({
  head: () => ({ meta: [{ title: "Individual Result — Zega Portal" }] }),
  component: () => (
    <PortalPageShell title="Individual Result" subtitle="Sign in to view your individual examination results.">
      <div className="max-w-md mx-auto">
        <form className="bg-card border border-border rounded-2xl p-6 shadow-soft grid gap-4">
          <div>
            <label className="text-sm font-medium block mb-1.5">Student ID</label>
            <input className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" placeholder="ZIS-0000" />
          </div>
          <div>
            <label className="text-sm font-medium block mb-1.5">Date of Birth</label>
            <input type="date" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
          </div>
          <button type="button" className="px-5 py-2.5 rounded-md bg-accent text-accent-foreground font-semibold">View Result</button>
        </form>
        <div className="mt-8">
          <EmptyNotice title="No result loaded" body="Enter your Student ID and date of birth to retrieve your most recent result slip." />
        </div>
      </div>
    </PortalPageShell>
  ),
});
