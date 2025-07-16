import type { EvaluationItemResponseDto } from "~/api/model";
import type { CarouselItemProps } from "~/shared/types/carousel-item";

interface EvaluationTextProps {
  evaluationData: EvaluationItemResponseDto;
}

function EvaluationText({ evaluationData }: EvaluationTextProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[626px] w-[290px]">
        <div className="-rotate-1 absolute top-20 right-8 left-8">
          <div className="mb-2 text-left">
            <div className="font-['Elice_Digital_Baeum'] font-bold text-[22px] text-black leading-tight">
              {evaluationData.title}
            </div>
          </div>
          <div className="mb-2 h-px w-full border-[#676767] border-t border-dashed" />
          <div className="mb-2 text-left">
            <span className="font-['Elice_Digital_Baeum'] font-bold text-[15px]">
              CODE NAME: {evaluationData.nickname}
            </span>
          </div>
          <div className="mb-2 h-px w-full border-[#676767] border-t border-dashed" />
          <div className="mb-4 flex flex-col gap-y-1 text-left">
            {evaluationData.hashtagList.map((hashtag) => (
              <div
                key={`hashtag-${hashtag}`}
                className="font-['Elice_Digital_Baeum'] font-normal text-[12px] text-gray-500 leading-tight"
              >
                {hashtag}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Theme1({
  slides,
  slideIndex,
  evaluationData,
}: CarouselItemProps) {
  if (!evaluationData) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/png/theme1.png"
          className="h-[626px] w-[290px] object-cover"
          alt="theme1-background"
        />
      </div>

      <EvaluationText evaluationData={evaluationData} />

      <div className="absolute inset-0 z-10">
        <div className="absolute top-4 left-4">
          <img
            src="/png/iconStarBlack.png"
            className="h-[24px] w-[24px]"
            alt="star"
          />
        </div>
        <div className="absolute top-0 right-1/3">
          <img src="/png/iconX.png" className="h-[85px] w-[85px]" alt="X" />
        </div>
        <div className="absolute top-20 right-10">
          <img
            src="/png/iconStarBlack.png"
            className="h-[30px] w-[30px]"
            alt="iconStarBlack"
          />
        </div>
        <div className="-left-5 -rotate-10 absolute top-1/2">
          <img
            src="/png/iconSmile.png"
            className="h-[106px] w-[106px]"
            alt="smile"
          />
        </div>
        <div className="-rotate-1 absolute top-15 left-15">
          <img
            src="/png/iconTagEasy.png"
            className="h-[21px] w-[63px]"
            alt="iconTagEasy"
          />
        </div>
        <div className="absolute top-50 right-10 rotate-10">
          <img
            src="/png/iconHanger.png"
            className="h-[38px] w-[46px]"
            alt="iconHanger"
          />
        </div>
        <div className="-rotate-30 -right-10 absolute bottom-30">
          <img
            src="/png/iconDescription.png"
            className="h-[48px] w-[142px]"
            alt="iconDescription"
          />
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute top-22 left-1/2 z-20 transform">
        <div className="h-px w-58 border-2 border-t" />
      </div>

      <div className="absolute inset-0 top-1/3 flex items-center justify-center">
        <div className="-rotate-1 transform">
          <img
            className="h-[226px] w-[226px] object-contain"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-16 left-1/2 z-20 transform">
        <div className="text-center">
          <span className="font-['NeoDunggeunmo'] text-2xl text-black">
            Score:{" "}
          </span>
          <span className="font-['NeoDunggeunmo'] font-bold text-2xl text-black">
            {evaluationData.totalScore.toString().padStart(2, "0")}점
          </span>
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-25 left-1/2 z-15 transform">
        <div className="h-px w-56 border-[#676767] border-t border-dashed" />
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-15 left-1/2 z-20 transform">
        <div className="h-px w-58 border-2 border-t" />
      </div>
    </div>
  );
}
