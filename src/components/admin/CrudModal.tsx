import { ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { GhostButton, PrimaryButton } from "./AdminUI";

export type FieldDef = {
  name: string;
  label: string;
  type?: "text" | "email" | "number" | "select" | "textarea" | "date";
  options?: string[];
  required?: boolean;
  placeholder?: string;
  colSpan?: 1 | 2;
};

export function CrudModal<T extends Record<string, any>>({
  open, onOpenChange, title, description, fields, value, onSubmit, submitLabel = "Save",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: string;
  fields: FieldDef[];
  value: T;
  onSubmit: (next: T) => void;
  submitLabel?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-primary">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const fd = new FormData(e.currentTarget);
            const next: any = { ...value };
            for (const f of fields) {
              const raw = fd.get(f.name);
              next[f.name] = f.type === "number" ? Number(raw || 0) : (raw ?? "");
            }
            onSubmit(next);
          }}
          className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-2"
        >
          {fields.map((f) => (
            <div key={f.name} className={f.colSpan === 2 || f.type === "textarea" ? "sm:col-span-2" : ""}>
              <label className="block text-xs font-semibold text-muted-foreground mb-1">{f.label}</label>
              {f.type === "select" ? (
                <select
                  name={f.name}
                  defaultValue={value[f.name] ?? ""}
                  required={f.required}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">Select…</option>
                  {f.options?.map((o) => <option key={o} value={o}>{o}</option>)}
                </select>
              ) : f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  defaultValue={value[f.name] ?? ""}
                  required={f.required}
                  placeholder={f.placeholder}
                  rows={3}
                  className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              ) : (
                <input
                  type={f.type ?? "text"}
                  name={f.name}
                  defaultValue={value[f.name] ?? ""}
                  required={f.required}
                  placeholder={f.placeholder}
                  className="w-full h-9 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
                />
              )}
            </div>
          ))}
          <DialogFooter className="sm:col-span-2 mt-2">
            <GhostButton onClick={() => onOpenChange(false)}>Cancel</GhostButton>
            <PrimaryButton type="submit">{submitLabel}</PrimaryButton>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export function ConfirmDialog({
  open, onOpenChange, title, description, onConfirm, confirmLabel = "Delete",
}: {
  open: boolean;
  onOpenChange: (v: boolean) => void;
  title: string;
  description?: ReactNode;
  onConfirm: () => void;
  confirmLabel?: string;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-serif text-xl text-primary">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <DialogFooter className="mt-2">
          <GhostButton onClick={() => onOpenChange(false)}>Cancel</GhostButton>
          <button
            type="button"
            onClick={() => { onConfirm(); onOpenChange(false); }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md bg-destructive text-destructive-foreground text-sm font-semibold hover:opacity-90 transition"
          >
            {confirmLabel}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
