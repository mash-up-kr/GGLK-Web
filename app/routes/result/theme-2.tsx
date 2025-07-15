import type { EvaluationItemResponseDto } from "~/api/model";
import type { CarouselItemProps } from "~/shared/types/carousel-item";

interface EvaluationTextProps {
  evaluationData: EvaluationItemResponseDto;
}

function EvaluationText({ evaluationData }: EvaluationTextProps) {
  const titleWords = evaluationData.title.split(" ");
  const titleLines = [];
  const wordsPerLine = Math.ceil(titleWords.length / 3);

  for (let i = 0; i < titleWords.length; i += wordsPerLine) {
    titleLines.push(titleWords.slice(i, i + wordsPerLine).join(" "));
  }

  const leftHashtags = evaluationData.hashtagList.slice(0, 2);
  const rightHashtags = evaluationData.hashtagList.slice(2, 4);

  return (
    <div className="absolute inset-0 top-[130px] z-20 flex items-center justify-center">
      <div className="mt-75 flex w-[280px] flex-col space-y-4">
        <div className="text-left">
          {titleLines.map((line, index) => (
            <div
              key={`title-${line.substring(0, 10)}-${index}`}
              className="font-['Elice_Digital_Baeum'] font-bold text-[22px] text-black leading-tight"
            >
              {line}
            </div>
          ))}
        </div>
        <div className="flex w-full justify-between">
          <div className="flex flex-col gap-y-1">
            {leftHashtags.map((hashtag) => (
              <div
                key={`hashtag-left-${hashtag}`}
                className="relative w-full px-2 py-1 font-['Elice_Digital_Baeum'] font-normal text-[12px]"
              >
                <img
                  src="/png/IconGrayBg.png"
                  className="absolute inset-0 h-full w-[150px]"
                  alt="gray-bg"
                />
                <span className="relative z-10">{hashtag}</span>
              </div>
            ))}
          </div>
          <div className="flex flex-col gap-y-1">
            {rightHashtags.map((hashtag) => (
              <div
                key={`hashtag-right-${hashtag}`}
                className="relative w-full px-2 py-1 font-['Elice_Digital_Baeum'] font-normal text-[12px]"
              >
                <img
                  src="/png/IconGrayBg.png"
                  className="absolute inset-0 h-full w-[150px]"
                  alt="gray-bg"
                />
                <span className="relative z-10">{hashtag}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="flex w-full justify-center">
          <img
            src="/png/IconLine.png"
            className="h-[2px] w-full"
            alt="icon-line"
          />
        </div>
        <div className="text-center">
          <span className="font-['NeoDunggeunmo'] text-2xl text-black">
            Score:{" "}
          </span>
          <span className="font-['NeoDunggeunmo'] font-bold text-2xl text-black">
            {evaluationData.totalScore.toString().padStart(2, "0")}점
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Theme2({
  slides,
  slideIndex,
  evaluationData,
}: CarouselItemProps) {
  if (!evaluationData) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-10">
        <div className="absolute top-20 left-20">
          <img
            src="/png/iconTodaysLook.png"
            className="h-[82px] w-[238px] rotate-3"
            alt="iconTodaysLook"
          />
        </div>
        <div className="absolute top-20 right-20">
          <img
            src="/png/iconStarPearl.png"
            className="h-[48px] w-[48px]"
            alt="iconStarPearl"
          />
        </div>
        <div className="absolute top-20 right-16">
          <img
            src="/png/iconStarPearl.png"
            className="h-[30px] w-[30px]"
            alt="iconStarPearl"
          />
        </div>
        <div className="absolute top-18 right-1">
          <img
            src="/png/iconTagSpicy.png"
            className="h-[21px] w-[63px]"
            alt="iconTagSpicy"
          />
        </div>
      </div>
      <div className="-mt-20 absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img
            src="/png/iconFrame.png"
            className="h-[289px] object-contain"
            alt="icon-frame"
          />
          <div className="absolute inset-0 bottom-9 flex items-center justify-center">
            <img
              className="h-[202px] w-[202px] rotate-3"
              src={slides[slideIndex].image}
              alt={slides[slideIndex].alt}
            />
          </div>
        </div>
      </div>
      <EvaluationText evaluationData={evaluationData} />
    </div>
  );
}
