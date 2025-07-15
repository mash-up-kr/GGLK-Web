import { useRef } from "react";
import { type Path, useFormContext } from "react-hook-form";
import ArrowRightIcon from "~/assets/arrow-right-icon.svg?react";
import OutlineRoundedButton from "~/shared/components/buttons/outline-rounded-button";
import SpeechBubbleButton from "~/shared/components/buttons/speech-bubble-button";
import type { AnalyzeFormData } from "./analyze";
import ImageSelectGuideModal from "./image-studio/image-select-guide-modal";

export default function ImageStudioPage({
  field,
  onNext,
}: {
  field: Path<AnalyzeFormData>;
  onNext: () => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const { register, watch } = useFormContext<AnalyzeFormData>();
  const { ref, ...rest } = register(field);
  const image = watch(field);
  const closeModalRef = useRef<HTMLButtonElement>(null);

  return (
    <div className="relative flex h-full grow flex-col">
      <StickersBackground />
      <input
        id="picture"
        type="file"
        className="hidden"
        accept="image/*"
        ref={(e) => {
          ref(e);
          imageRef.current = e;
        }}
        {...rest}
      />
      <div className="z-50 flex grow select-none flex-col items-center justify-center space-y-4 border-box p-4">
        {image?.[0] ? (
          <PreviewContent
            imgSrc={URL.createObjectURL(image?.[0])}
            onNext={onNext}
          />
        ) : (
          <InitialContent imageRef={imageRef} closeModalRef={closeModalRef} />
        )}
      </div>
    </div>
  );
}

function PreviewContent({
  imgSrc,
  onNext,
}: {
  imgSrc: string;
  onNext: () => void;
}) {
  return (
    <>
      <p className="font-bold font-sf text-xl">이 사진으로 평가받을 거 맞지?</p>
      <div className="flex items-center justify-center [@media(max-height:768px)]:grow">
        <img src={imgSrc} alt="preview" className="w-4/5 border sm:w-3/5" />
      </div>

      <div className="flex flex-col items-center justify-center">
        <div className="flex w-full items-center justify-center gap-1.5 py-2.5 sm:py-3.5">
          <img
            width={60}
            src="/png/ai-face/speaking.png"
            alt="person-image-placeholder"
            className="-rotate-15"
          />
          <SpeechBubbleButton onClick={onNext} label="선택완료" />
        </div>
        <button
          type="button"
          className="cursor-pointer font-apple-gothic font-semibold text-sm underline"
        >
          이미지 다시 선택하기
        </button>
      </div>
    </>
  );
}

function InitialContent({
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
      <p className="font-bold font-sf text-lg">
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

function StickersBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
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
