import { createFileRoute } from "@tanstack/react-router";
import { AdminCard, GhostButton, PageTitle, PrimaryButton } from "@/components/admin/AdminUI";
import { ConfirmDialog, CrudModal, FieldDef } from "@/components/admin/CrudModal";
import { useState } from "react";
import { toast } from "sonner";
import { Plus, Trash2 } from "lucide-react";

export const Route = createFileRoute("/admin/settings")({
  component: SettingsAdmin,
});

function Field({ label, defaultValue, type = "text" }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div>
      <label className="text-sm font-medium block mb-1.5">{label}</label>
      <input type={type} defaultValue={defaultValue} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring" />
    </div>
  );
}

function Toggle({ label, hint, defaultChecked }: { label: string; hint?: string; defaultChecked?: boolean }) {
  return (
    <label className="flex items-start justify-between gap-4 py-3 border-b border-border last:border-0">
      <div>
        <div className="text-sm font-medium">{label}</div>
        {hint && <div className="text-xs text-muted-foreground mt-0.5">{hint}</div>}
      </div>
      <input type="checkbox" defaultChecked={defaultChecked} className="h-5 w-9 appearance-none rounded-full bg-muted checked:bg-accent transition-colors relative cursor-pointer
        before:content-[''] before:absolute before:top-0.5 before:left-0.5 before:h-4 before:w-4 before:rounded-full before:bg-white before:transition-transform checked:before:translate-x-4" />
    </label>
  );
}

type Admin = { name: string; role: string; email: string };
const ADMIN_FIELDS: FieldDef[] = [
  { name: "name", label: "Full Name", required: true },
  { name: "email", label: "Email", type: "email", required: true },
  { name: "role", label: "Role", type: "select", options: ["Owner", "Editor", "Viewer"], required: true },
];

function SettingsAdmin() {
  const [admins, setAdmins] = useState<Admin[]>([
    { name: "Admin User", role: "Owner", email: "admin@zegainternational.school" },
    { name: "Hanna Wolde", role: "Editor", email: "h.wolde@zegainternational.school" },
    { name: "Daniel Tadesse", role: "Editor", email: "d.tadesse@zegainternational.school" },
  ]);
  const [editing, setEditing] = useState<Admin | null>(null);
  const [origKey, setOrigKey] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [deleting, setDeleting] = useState<Admin | null>(null);

  return (
    <div>
      <PageTitle title="Settings" subtitle="School information and system preferences." />

      <div className="grid gap-6 lg:grid-cols-2">
        <AdminCard title="School Information">
          <form onSubmit={(e) => { e.preventDefault(); toast.success("School information saved"); }} className="grid gap-4">
            <Field label="School Name" defaultValue="Zega International School" />
            <Field label="Email" type="email" defaultValue="contact@zegainternational.school" />
            <Field label="Phone" defaultValue="+251 99 472 9293" />
            <Field label="Address" defaultValue="Lideta, Behind Federal Court, Addis Ababa" />
            <Field label="Academic Year" defaultValue="2025 / 2026" />
            <div className="flex gap-2">
              <PrimaryButton type="submit">Save Changes</PrimaryButton>
              <GhostButton onClick={() => toast("Discarded changes")}>Cancel</GhostButton>
            </div>
          </form>
        </AdminCard>

        <AdminCard title="Website Preferences">
          <Toggle label="Show admissions banner" hint="Promote the open admissions cycle on the homepage." defaultChecked />
          <Toggle label="Enable Book a Visit form" hint="Allow visitors to submit appointment requests." defaultChecked />
          <Toggle label="Public gallery" hint="Show the photo gallery to all visitors." defaultChecked />
          <Toggle label="Maintenance mode" hint="Temporarily hide the public site for maintenance." />
        </AdminCard>

        <AdminCard
          title="Administrators"
          action={<PrimaryButton onClick={() => { setEditing({ name: "", email: "", role: "Editor" }); setOrigKey(null); setOpen(true); }}><Plus className="h-4 w-4" /> Add Admin</PrimaryButton>}
        >
          <ul className="space-y-3">
            {admins.map((u) => (
              <li key={u.email} className="flex items-center gap-3 p-3 border border-border rounded-lg">
                <div className="h-9 w-9 rounded-full bg-accent/15 text-accent grid place-items-center font-bold text-sm">{u.name[0]}</div>
                <div className="flex-1">
                  <div className="text-sm font-semibold">{u.name}</div>
                  <div className="text-xs text-muted-foreground">{u.email}</div>
                </div>
                <span className="text-xs px-2 py-1 rounded-full bg-muted text-muted-foreground">{u.role}</span>
                <button onClick={() => { setEditing(u); setOrigKey(u.email); setOpen(true); }} className="text-xs text-primary hover:text-accent">Edit</button>
                <button onClick={() => setDeleting(u)} className="text-muted-foreground hover:text-destructive"><Trash2 className="h-4 w-4" /></button>
              </li>
            ))}
          </ul>
        </AdminCard>

        <AdminCard title="Security">
          <Toggle label="Two-factor authentication" hint="Require 2FA for all admin sign-ins." defaultChecked />
          <Toggle label="Audit log" hint="Record all admin actions for review." defaultChecked />
          <Toggle label="Public registration" hint="Allow anyone to register for an account." />
        </AdminCard>
      </div>

      {editing && <CrudModal open={open} onOpenChange={setOpen} title={origKey ? "Edit Admin" : "Add Admin"} fields={ADMIN_FIELDS} value={editing} onSubmit={(next) => { setAdmins((p) => origKey ? p.map((x) => x.email === origKey ? next : x) : [...p, next]); setOpen(false); toast.success(origKey ? "Admin updated" : "Admin added"); }} />}
      <ConfirmDialog open={!!deleting} onOpenChange={(v) => !v && setDeleting(null)} title="Remove admin?" description={deleting?.name} onConfirm={() => deleting && (setAdmins((p) => p.filter((x) => x.email !== deleting.email)), toast.success("Admin removed"))} />
    </div>
  );
}
