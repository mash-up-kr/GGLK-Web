import ActionButton from "~/shared/components/bottomSheet/action-button";
import type { BottomSheetAction } from "~/shared/components/bottomSheet/bottom-sheet";

interface ShareContentProps {
  mainActions: BottomSheetAction[];
  secondaryActions: BottomSheetAction[];
}

export function ShareContent({
  mainActions,
  secondaryActions,
}: ShareContentProps) {
  return (
    <>
      <h3 className="mb-[20px] px-[16px] text-start font-bold text-[18px] text-white">
        공유하기
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
      {secondaryActions.length > 0 && (
        <>
          <hr className="py-3 text-[#636363]" />
          {secondaryActions.map((action) => (
            <ActionButton key={action.id} action={action} variant="vertical" />
          ))}
        </>
      )}
    </>
  );
}

export default ShareContent;
