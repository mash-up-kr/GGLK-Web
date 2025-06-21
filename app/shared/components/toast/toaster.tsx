import { tv } from "tailwind-variants";
import type { ToastPosition } from "~/shared/types/toast";

const toaster = tv({
  base: "absolute inset-0 border px-2 py-1 flex flex-col gap-0.5",
  variants: {
    position: {
      "top-center": "items-center justify-start",
      "bottom-center": "items-center justify-end",
      "top-left": "items-start justify-start",
      "bottom-left": "items-start justify-end",
      "top-right": "items-end justify-start",
      "bottom-right": "items-end justify-end",
    },
  },
});

export default function Toaster({ position }: { position: ToastPosition }) {
  return <div className={toaster({ position })} />;
}
