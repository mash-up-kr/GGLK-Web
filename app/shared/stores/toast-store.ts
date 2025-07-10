import type { Toast, ToastType } from "../types/toast";

type ToastAction =
  | {
      type: "set";
      payload: Toast;
    }
  | {
      type: "remove";
    };

interface ToastOptions {
  message: string;
  type?: ToastType;
}

interface ToastConfig {
  offset?: {
    x?: number;
    y?: number;
  };
}

const reducer = (state: Toast | null, action: ToastAction) => {
  switch (action.type) {
    case "set":
      return { ...action.payload };
    case "remove":
      return null;
  }
};

let toastStore: Toast | null = null;
const listeners = new Set<() => void>();

const dispatch = (action: ToastAction) => {
  toastStore = reducer(toastStore, action);
  for (const listener of listeners) {
    listener();
  }
  // 테스트 용 로그 출력
  // console.log(getToast());
};

const subscribe = (listener: () => void) => {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
};

const getToast = () => toastStore;

const genIdByTime = () => new Date().getTime().toString();

const createToast = ({
  message,
  type = "plain",
  config,
}: ToastOptions & { config?: ToastConfig }) => {
  return {
    id: genIdByTime(),
    message,
    type,
    offset: config?.offset,
  };
};

const toast = (message: string, config?: ToastConfig) => {
  const newToast = createToast({
    message,
    config,
  });
  dispatch({ type: "set", payload: newToast });
};

toast.success = (message: string, config?: ToastConfig) => {
  const newToast = createToast({
    message,
    type: "success",
    config,
  });
  dispatch({ type: "set", payload: newToast });
};

toast.error = (message: string, config?: ToastConfig) => {
  const newToast = createToast({
    message,
    type: "error",
    config,
  });
  dispatch({ type: "set", payload: newToast });
};

const toastHandler = {
  getToast,
  subscribe,
  dispatch,
};

export { toast, toastHandler };
