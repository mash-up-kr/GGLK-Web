import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

// `cn` 함수 예시
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
