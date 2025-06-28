import { motion } from "motion/react";
import { useEffect } from "react";
import { toastHandler } from "~/shared/stores/toast-store";
import type { Toast } from "~/shared/types/toast";

interface ToastItemProps {
  toast: Toast;
}

export default function ToastItem({ toast }: ToastItemProps) {
  const { id, message, type, offset } = toast;

  useEffect(() => {
    const timerId = setTimeout(() => {
      toastHandler.dispatch({ type: "remove" });
    }, 1000);

    return () => {
      clearTimeout(timerId);
    };
  }, []);

  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className={
        "relative w-fit max-w-full rounded-3xl border bg-black px-5 py-2.5 text-center text-sm text-white"
      }
      style={{
        bottom: offset?.y,
        left: offset?.x,
      }}
    >
      {message}
    </motion.div>
  );
}
