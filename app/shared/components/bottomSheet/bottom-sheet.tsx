import { useEffect, useRef, useState } from "react";

let bottomSheetHeight = 0;
export const BOTTOM_SHEET_HEIGHT = () => bottomSheetHeight;

// 바텀시트에서 수행하는 Action Item들의 Type 정의
export interface BottomSheetAction {
  id: string;
  label: string;
  icon?: string;
  onClick: () => void | Promise<void>;
  disabled?: boolean;
}

// 바텀시트 자체 prop type 정의
export interface ShareBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  width?: string;
}

function BottomSheet({
  isOpen,
  onClose,
  children,
  // className = "",
  width,
}: ShareBottomSheetProps) {
  const [_, setIsVisible] = useState(false);
  const sheetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
      if (sheetRef.current) {
        bottomSheetHeight = sheetRef.current.offsetHeight;
      }
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleBackdropClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      onClose();
    } else if (e.key === "Enter" || e.key === " ") {
      handleBackdropClick(e);
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={handleKeyDown}
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-50" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
        aria-label="close-bottomSheet"
      />
      {/* 시트 */}
      <div
        className={`pointer-events-auto relative w-[359px] max-w-[678px] transform rounded-t-2xl bg-[#212121] py-[8px] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        } ${width || ""}`}
        style={{
          width: width
            ? undefined
            : "clamp(359px, calc(359px + (100vw - 375px) * (678 - 359) / (700 - 375)), 678px)",
        }}
        ref={sheetRef}
        role="alert"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-[#636363]" />
        </div>
        {children}
      </div>
    </div>
  );
}

export default BottomSheet;
