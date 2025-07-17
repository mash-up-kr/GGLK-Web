import type { BottomSheetAction } from "./bottom-sheet";

interface ActionButtonProps {
  action: BottomSheetAction;
  variant: "horizontal" | "vertical";
}

export function ActionButton({ action, variant }: ActionButtonProps) {
  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (action.disabled) return;
    try {
      await action.onClick();
    } catch (error) {
      console.error(`액션 실행 실패: ${action.id}`, error);
    }
  };

  if (variant === "horizontal") {
    return (
      <button
        type="button"
        onClick={handleClick}
        disabled={action.disabled}
        className="flex cursor-pointer flex-col items-center gap-2 rounded-lg p-2 disabled:cursor-not-allowed disabled:opacity-50"
      >
        {action.icon && (
          <img src={action.icon} alt={action.label} className="h-12 w-12" />
        )}
        <span className="text-white text-xs">{action.label}</span>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      disabled={action.disabled}
      className="w-full cursor-pointer rounded-lg px-[16px] text-start font-medium text-[#B9B9B9] disabled:cursor-not-allowed disabled:opacity-50"
    >
      <div className="flex flex-row items-center gap-x-3">
        {action.icon && (
          <img src={action.icon} alt={action.label} className="h-12 w-12" />
        )}
        <span>{action.label}</span>
      </div>
    </button>
  );
}

export default ActionButton;
