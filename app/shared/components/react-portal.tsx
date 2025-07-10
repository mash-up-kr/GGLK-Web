import type { PropsWithChildren } from "react";
import { createPortal } from "react-dom";

export default function ReactPortal({ children }: PropsWithChildren) {
  return document.body && createPortal(children, document.body);
}
