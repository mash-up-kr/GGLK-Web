import ArrowRightIcon from "~/assets/arrow-right-icon.svg?react";
import OutlineRoundedButton from "~/shared/components/buttons/outline-rounded-button";
import ImageSelectGuideModal from "./image-select-guide-modal";

export default function InitialContent({
  imageRef,
  closeModalRef,
}: {
  imageRef: React.RefObject<HTMLInputElement | null>;
  closeModalRef: React.RefObject<HTMLButtonElement | null>;
}) {
  return (
    <>
      <img
        src="/png/ai-face/spicy.png"
        alt="ai-character"
        className="size-32.5 xs:size-38 animate-rotate-snap"
      />
      <p className="text-balance break-keep text-center font-bold font-sf text-lg">
        이제 평가받고 싶은 이미지를 올려봐!
      </p>
      <ImageSelectGuideModal
        onStart={async () => {
          if (imageRef.current) {
            imageRef.current.click();
          }
        }}
        triggerComponent={
          <OutlineRoundedButton className="flex items-center gap-2 px-5 py-1.5">
            Upload Image <ArrowRightIcon className="w-[22px]" />
          </OutlineRoundedButton>
        }
        closeModalRef={closeModalRef}
      />
    </>
  );
}
