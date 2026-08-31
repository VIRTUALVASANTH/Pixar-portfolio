import { X } from "lucide-react";
import { cn } from "@/lib/cn";

export function CloseBtn({ onClick, className }: { onClick: () => void; className?: string }) {
  return (
    <button
      type="button"
      aria-label="Close"
      onClick={onClick}
      className={cn(
        "grid size-11 shrink-0 place-items-center rounded-full border border-current/20 transition-transform duration-150 hover:border-amber-deep active:scale-[0.96]",
        className,
      )}
    >
      <X className="size-4" />
    </button>
  );
}
