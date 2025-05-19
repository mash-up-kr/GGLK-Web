import { AnimatePresence, motion } from "motion/react";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import ReactPortal from "./react-portal";

interface ModalContextType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ModalContext = createContext<ModalContextType | null>(null);

function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("Modal components must be used within a Modal.Root");
  }
  return context;
}

interface RootProps {
  children: React.ReactNode;
  defaultOpen?: boolean;
}

function Root({ children, defaultOpen = false }: RootProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <ModalContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </ModalContext.Provider>
  );
}

function Trigger({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useModal();
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

function Close({ children }: { children: React.ReactNode }) {
  const { setIsOpen } = useModal();
  return (
    <button
      type="button"
      onClick={() => setIsOpen(false)}
      className="cursor-pointer"
    >
      {children}
    </button>
  );
}

function Content({ children }: { children: React.ReactNode }) {
  const { isOpen } = useModal();
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (dialogRef.current) {
      if (isOpen) {
        dialogRef.current.showModal();
      } else {
        dialogRef.current.close();
      }
    }
  }, [isOpen]);

  return (
    <ReactPortal>
      <AnimatePresence mode="wait">
        {isOpen && (
          <motion.dialog
            ref={dialogRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
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
