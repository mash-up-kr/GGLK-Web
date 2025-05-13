import {
  motion,
  useAnimate,
  useMotionValue,
  usePresence,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

interface TypeWriterProps {
  text: string;
  durationPerChar?: number;
}

export default function TypeWriter({
  text,
  durationPerChar = 0.03,
}: TypeWriterProps) {
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) => text.slice(0, latest));
  const [isPresent, safeToRemove] = usePresence();
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (isPresent) {
      const enterAnimation = async () => {
        await animate(count, text.length, {
          type: "tween",
          duration: text.length * durationPerChar,
          ease: "easeOut",
        });
      };
      enterAnimation();
    } else {
      const exitAnimation = async () => {
        await animate(count, 0, {
          type: "tween",
          duration: text.length * durationPerChar,
          ease: "easeOut",
        });

        safeToRemove();
      };

      exitAnimation();
    }
  }, [isPresent, animate, count, text.length, safeToRemove, durationPerChar]);

  // useEffect(() => {
  //   const controls = animate(count, text.length, {
  //     type: "tween", // Not really needed because adding a duration will force "tween"
  //     duration: 1,
  //     ease: "easeInOut",
  //   });
  //   return controls.stop;
  // }, [count, text.length]);

  return <motion.span>{displayText}</motion.span>;
}
