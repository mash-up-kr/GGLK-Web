import { AnimatePresence } from "motion/react";
import { useSyncExternalStore } from "react";
import { tv } from "tailwind-variants";
import { toastHandler } from "~/shared/stores/toast-store";
import type { ToastPosition } from "~/shared/types/toast";
import ToastItem from "./toast-item";

const toaster = tv({
  base: "absolute inset-0 px-2 py-1 flex flex-col gap-0.5 pointer-events-none",
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

interface ToasterProps {
  position: ToastPosition;
}

export default function Toaster({ position }: ToasterProps) {
  const toast = useSyncExternalStore(
    toastHandler.subscribe,
    toastHandler.getToast,
  );

  return (
    <div className={toaster({ position })}>
      <AnimatePresence mode="wait">
        {toast && <ToastItem toast={toast} />}
      </AnimatePresence>
    </div>
  );
}
