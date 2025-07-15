import Lottie from "react-lottie";
import loadingLottie from "~/assets/loading.json";
import SpeechBubbleButton from "~/shared/components/buttons/speech-bubble-button";
import { cn } from "~/shared/utils/classname-utils";

export default function PreviewContent({
  isLoading,
  placeholderImageUrl,
  imageRef,
  imgSrc,
  onNext,
}: {
  isLoading: boolean;
  placeholderImageUrl: string;
  imageRef: React.RefObject<HTMLInputElement | null>;
  imgSrc?: string;
  onNext: () => void;
}) {
  const isLoadingOrNoImage = isLoading || !imgSrc;
  return (
    <>
      <p className="font-bold font-sf text-xl">이 사진으로 평가받을 거 맞지?</p>
      <div className="flex items-center justify-center [@media(max-height:768px)]:grow">
        <div className="relative flex h-full w-full items-center justify-center">
          <img
            src={isLoadingOrNoImage ? placeholderImageUrl : imgSrc}
            alt="preview"
            className={cn(
              "w-4/5 sm:w-3/5",
              isLoadingOrNoImage ? "opacity-80 brightness-60" : "border",
            )}
          />
          {isLoadingOrNoImage && (
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
          className="cursor-pointer font-apple-gothic font-semibold text-sm underline"
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
