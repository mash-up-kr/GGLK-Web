import { AnimatePresence, motion } from "motion/react";
import {
  type ComponentProps,
  type ComponentRef,
  cloneElement,
  isValidElement,
  useEffect,
  useRef,
  useState,
} from "react";
import { createContext } from "../contexts/create-context";
import ReactPortal from "./react-portal";

interface ModalContext {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const [ModalContextProvider, useModal] = createContext<ModalContext>({
  contextName: "ModalContext",
  hookName: "useModal",
  providerName: "ModalContextProvider",
});

interface RootProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Root({ children, defaultOpen = false }: RootProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <ModalContextProvider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContextProvider>
  );
}

function Trigger({
  children,
  asChild,
}: { children: React.ReactNode; asChild?: boolean }) {
  const { setIsOpen } = useModal();
  if (asChild && isValidElement(children)) {
    const childElement = children as React.ReactElement<{
      onClick?: (e: React.MouseEvent) => void;
    }>;
    return cloneElement(childElement, {
      onClick: (e: React.MouseEvent) => {
        if (typeof childElement.props.onClick === "function") {
          childElement.props.onClick(e);
        }
        setIsOpen(true);
      },
    });
  }
  return (
    <button
      type="button"
      onClick={() => setIsOpen(true)}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

function Close({ children, onClick, ...rest }: ComponentProps<"button">) {
  const { setIsOpen } = useModal();
  return (
    <button
      type="button"
      {...rest}
      onClick={(e) => {
        if (typeof onClick === "function") {
          onClick(e);
        }
        setIsOpen(false);
      }}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

function Content({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  const { isOpen } = useModal();
  const dialogRef = useRef<ComponentRef<typeof motion.dialog>>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      }
    }
  }, [isOpen]);

  return (
    <ReactPortal>
      <AnimatePresence
        mode="wait"
        onExitComplete={() => {
          dialogRef.current?.close();
        }}
      >
        {isOpen && (
          <motion.dialog
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={className}
            transition={{ duration: 0.25, ease: "easeInOut" }}
          >
            {children}
          </motion.dialog>
        )}
      </AnimatePresence>
    </ReactPortal>
  );
}

const Modal = {
  Root,
  Trigger,
  Content,
  Close,
};

export default Modal;
