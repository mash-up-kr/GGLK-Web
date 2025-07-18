import { motion } from "motion/react";
import { useEffect } from "react";
import { toastHandler } from "~/shared/stores/toast-store";
import type { Toast } from "~/shared/types/toast";
import { cn } from "~/shared/utils/classname-utils";

interface ToastItemProps {
  toast: Toast;
}

export default function ToastItem({ toast }: ToastItemProps) {
  const { id, message, type, offset } = toast;

  // biome-ignore lint/correctness/useExhaustiveDependencies: id가 바뀔 때마다 실행되어야하는게 맞으므로 비활성화
  useEffect(() => {
    const timerId = setTimeout(() => {
      toastHandler.dispatch({ type: "remove" });
    }, 2500);

    return () => {
      clearTimeout(timerId);
    };
  }, [id]);

  return (
    <motion.div
      key={id} // id가 바뀔 때마다 새로운 컴포넌트
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeInOut" }}
      className={cn(
        "relative z-50 w-fit max-w-full rounded-3xl bg-black px-5 py-2.5 text-center text-sm text-white",
        type === "error" && "bg-red-600",
      )}
      style={{
        bottom: offset?.y,
        left: offset?.x,
      }}
    >
      {message}
    </motion.div>
  );
}
