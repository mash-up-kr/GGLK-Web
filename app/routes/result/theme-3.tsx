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

  return (
    <div className="absolute bottom-20 z-60 w-[257px] translate-x-1/2 gap-y-3">
      <div className="relative flex h-full w-full flex-col justify-between p-2">
        <div className="flex flex-col space-y-1 text-gray-600">
          <div className="font-medium text-xs">Title</div>
          <div className="font-bold text-lg">
            {titleLines.map((line, index) => (
              <div
                key={`title-${line.substring(0, 10)}-${index}`}
                className="font-['Elice_Digital_Baeum'] font-bold text-[10px] text-black leading-tight"
              >
                {line}
              </div>
            ))}
          </div>

          <div className="flex flex-row items-start justify-center gap-x-1">
            <div className="font-medium text-xs">Name: </div>
            <div className="flex flex-row items-start gap-x-1 text-xs">
              <span className="font-['Elice_Digital_Baeum'] font-bold text-black">
                CODE NAME:
              </span>
              <span className="font-['Elice_Digital_Baeum'] font-bold text-black">
                {evaluationData.nickname}
              </span>
            </div>
          </div>

          <div className="flex flex-row items-start justify-center gap-x-1">
            <div className="font-medium text-xs">Hash Tag:</div>
            <div className="flex flex-row items-start gap-x-1 text-md">
              <div className="grid grid-cols-2 gap-x-1">
                {evaluationData.hashtagList.map((hashtag) => (
                  <span
                    key={`hashtag-${hashtag}`}
                    className="font-['Elice_Digital_Baeum'] font-normal text-blue-500 text-xs leading-tight"
                  >
                    {hashtag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-1">
          <hr className="w-full border-[#676767] border-t border-dashed" />
          <div className="text-center">
            <span className="font-['NeoDunggeunmo'] text-black text-sm">
              Score:{" "}
            </span>
            <span className="font-['NeoDunggeunmo'] font-bold text-black text-sm">
              {evaluationData.totalScore.toString().padStart(2, "0")}점
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Theme3({
  slides,
  slideIndex,
  evaluationData,
}: CarouselItemProps) {
  if (!evaluationData) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="-translate-x-1/2 absolute top-20 left-1/2 z-30 w-[300px]">
        <img src="/png/IconDragedText.png" alt="IconDragedText" />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="/png/photoboothLarge.png"
          className="h-[420px] w-[320px] object-contain"
          alt="photoboothLarge"
        />
      </div>
      <div className="absolute top-1/3 left-1/2 z-50 transform">
        <img
          src="/png/IconTextBubble.png"
          className="size-full object-contain"
          alt="IconTextBubble"
        />
      </div>
      <div className="absolute bottom-10 z-50 w-[257px] translate-x-1/2">
        <img src="/png/photoboothSmall.png" alt="photoboothSmall" />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="/png/photoboothSmall.png"
          className="h-[420px] w-[320px] object-contain"
          alt="photoboothSmall"
        />
      </div>

      <div className="absolute z-9999 flex items-center justify-center">
        <div className="relative">
          <div className="absolute top-16 right-8">
            <img
              src="/png/iconBubble.png"
              className="z-9999 h-[50px] w-[50px]"
              alt="iconBubble"
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-20 left-30 z-20">
        <img
          src="/png/iconFolder.png"
          className="h-[52px] w-[48px]"
          alt="iconFolder"
        />
      </div>
      <div className="absolute bottom-30 left-13 z-20">
        <img
          src="/png/iconFolder.png"
          className="h-[52px] w-[48px]"
          alt="iconFolder"
        />
      </div>

      <div className="absolute inset-0 z-25 flex items-center justify-center">
        <div className="absolute inset-0 top-4 flex items-center justify-center">
          <img
            className="h-[288px] w-[288px] rounded-b-md object-cover"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
        </div>
      </div>

      <EvaluationText evaluationData={evaluationData} />
    </div>
  );
}
