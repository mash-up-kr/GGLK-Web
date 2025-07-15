import type { ComponentProps } from "react";
import { cn } from "~/shared/utils/classname-utils";

export default function OutlineRoundedButton({
  onClick,
  children,
  className,
}: ComponentProps<"button">) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-pointer rounded-[20px] border-[1.5px] font-bold",
        className,
      )}
    >
      {children}
    </button>
  );
}
