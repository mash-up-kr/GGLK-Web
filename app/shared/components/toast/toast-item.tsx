import { motion } from "motion/react";
import type { Toast } from "~/shared/types/toast";

interface ToastItemProps {
  toast: Toast;
}

export default function ToastItem({ toast }: ToastItemProps) {
  const { id, message, type } = toast;
  return (
    <motion.div
      key={id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="w-fit max-w-full rounded-3xl bg-black px-5 py-2.5 text-center text-sm text-white"
    >
      {message}
    </motion.div>
  );
}
