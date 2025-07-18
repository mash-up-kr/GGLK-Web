import Lottie from "react-lottie";
import ExclamationMark from "~/assets/image-studio/exclamation-mark.svg?react";
import loadingLottie from "~/assets/loading.json";
import SpeechBubbleButton from "~/shared/components/buttons/speech-bubble-button";
import { cn } from "~/shared/utils/classname-utils";

export default function PreviewContent({
  isLoading,
  isConverting,
  isError,
  placeholderImageUrl,
  imageRef,
  imgSrc,
  onNext,
}: {
  isLoading: boolean;
  isConverting: boolean;
  isError: boolean;
  placeholderImageUrl: string | null;
  imageRef: React.RefObject<HTMLInputElement | null>;
  imgSrc?: string;
  onNext: () => void;
}) {
  return (
    <>
      <p className="font-bold font-sf text-xl">이 사진으로 평가받을 거 맞지?</p>
      <div className="flex items-center justify-center [@media(max-height:768px)]:grow">
        <div className="relative flex h-full w-full items-center justify-center">
          {isConverting ? (
            <div className="flex size-50 items-center justify-center">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loadingLottie,
                }}
                height={100}
                width={100}
              />
            </div>
          ) : (
            <img
              src={imgSrc ?? placeholderImageUrl ?? ""}
              alt="preview"
              className={cn(
                "z-10 w-4/5 sm:w-3/5",
                isLoading || !imgSrc ? "opacity-80 brightness-60" : "border",
              )}
            />
          )}
          {isError && (
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50">
              <div className="flex space-x-2">
                <ExclamationMark className="size-7" />
                <p className="text-center font-bold font-sf text-xl">
                  업로드 실패
                </p>
              </div>
            </div>
          )}

          {isLoading && (
            <div className="-translate-x-1/2 -translate-y-1/2 absolute top-1/2 left-1/2 z-50 ">
              <Lottie
                options={{
                  loop: true,
                  autoplay: true,
                  animationData: loadingLottie,
                }}
                height={100}
                width={100}
              />
            </div>
          )}
        </div>
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
          className="cursor-pointer font-apple-gothic font-semibold text-sm underline opacity-80"
          onClick={() => {
            if (imageRef.current) {
              imageRef.current.click();
            }
          }}
        >
          이미지 다시 선택하기
        </button>
      </div>
    </>
  );
}
