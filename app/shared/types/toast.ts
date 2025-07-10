export type ToastType = "success" | "error" | "plain";

export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export type Toast = {
  id: string;
  message: string;
  type: ToastType;
  offset?: {
    x?: number;
    y?: number;
  };
};
