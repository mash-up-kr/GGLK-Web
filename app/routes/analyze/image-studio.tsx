import { type Path, useFormContext } from "react-hook-form";
import ArrowRightIcon from "~/assets/arrow-right-icon.svg?react";
import ImageSelectGuideModal from "~/shared/components/analyze/image-select-guide-modal";
import OutlineRoundedButton from "~/shared/components/buttons/outline-rounded-button";
import type { AnalyzeFormData } from "./analyze";

export default function ImageStudioPage({
  field,
  onNext,
}: {
  field: Path<AnalyzeFormData>;
  onNext: () => void;
}) {
  const { register } = useFormContext<AnalyzeFormData>();

  return (
    <div className="relative flex h-full flex-col items-center justify-center">
      <StickersBackground />

      <div className="flex select-none flex-col items-center justify-center space-y-4">
        <img
          src="/png/ai-face/spicy.png"
          alt="ai-character"
          className="size-32.5 xs:size-38 animate-rotate-snap"
        />
        <p className="font-bold font-sf text-lg">
          이제 평가받고 싶은 이미지를 올려봐!
        </p>
        <ImageSelectGuideModal
          triggerComponent={
            <OutlineRoundedButton className="flex items-center gap-2 px-5 py-1.5">
              Upload Image <ArrowRightIcon className="w-[22px]" />
            </OutlineRoundedButton>
          }
        />
      </div>

      {/* <input type="text" {...register(field)} className="border" /> */}

      {/* <button type="button" onClick={onNext}>
        다음
      </button> */}
    </div>
  );
}

function StickersBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden border">
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="-translate-x-1/2 -rotate-30 absolute top-1/12 left-0 size-20 xs:size-24"
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="absolute right-0 bottom-3/12 size-20 xs:size-24 translate-x-1/2"
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="-translate-x-1/2 absolute bottom-1/12 left-0 size-20 xs:size-24 rotate-30"
      />
    </div>
  );
}
