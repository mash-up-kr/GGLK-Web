import { useEffect, useState } from "react";
import ActionButton from "./action-button";

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
  title: string;
  mainActions: BottomSheetAction[];
  secondaryActions?: BottomSheetAction[];
  className?: string;
  width?: string;
}

function BottomSheet({
  isOpen,
  onClose,
  title,
  mainActions,
  secondaryActions = [],
  // className = "",
  width = "w-[359px]",
}: ShareBottomSheetProps) {
  const [_, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
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
        className={`relative ${width} max-w-md transform rounded-t-2xl bg-[#212121] py-[8px] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
        role="alert"
        aria-modal="true"
        aria-labelledby="bottom-sheet-title"
        // eslint-disable-next-line jsx-a11y/no-noninteractive-element-to-interactive-role
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-[#636363]" />
        </div>
        <h3
          id="bottom-sheet-title"
          className="mb-[20px] px-[16px] text-start font-bold text-[18px] text-white"
        >
          {title}
        </h3>
        {mainActions.length > 0 && (
          <div className="mb-[20px] flex justify-start gap-8 px-[16px]">
            {mainActions.map((action) => (
              <ActionButton
                key={action.id}
                action={action}
                variant="horizontal"
              />
            ))}
          </div>
        )}
        {/* secondary actions가 존재하지 않을 경우 구분선 생략 */}
        {secondaryActions.length > 0 && (
          <>
            <hr className="py-3 text-[#636363]" />
            {secondaryActions.map((action) => (
              <ActionButton
                key={action.id}
                action={action}
                variant="vertical"
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
}

export default BottomSheet;
