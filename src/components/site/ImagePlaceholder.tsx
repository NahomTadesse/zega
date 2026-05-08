import { ImageIcon } from "lucide-react";

type Props = {
  label?: string;
  className?: string;
  ratio?: "square" | "video" | "4/3" | "16/10";
};

const ratioClass: Record<NonNullable<Props["ratio"]>, string> = {
  square: "aspect-square",
  video: "aspect-video",
  "4/3": "aspect-[4/3]",
  "16/10": "aspect-[16/10]",
};

export function ImagePlaceholder({ label, className = "", ratio = "4/3" }: Props) {
  return (
    <div
      className={`relative w-full ${ratioClass[ratio]} overflow-hidden bg-gradient-to-br from-secondary via-muted to-surface flex items-center justify-center ${className}`}
    >
      <div
        className="absolute inset-0 opacity-[0.07]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(45deg, currentColor 0 1px, transparent 1px 14px)",
          color: "var(--color-primary)",
        }}
      />
      <div className="relative flex flex-col items-center text-muted-foreground">
        <ImageIcon className="h-8 w-8 opacity-50" />
        {label && <span className="mt-2 text-xs font-medium tracking-wide uppercase opacity-70">{label}</span>}
      </div>
    </div>
  );
}
