import type { EvaluationItemResponseDto } from "~/api/model";
import type { CarouselItemProps } from "~/shared/types/carousel-item";

interface EvaluationTextProps {
  evaluationData: EvaluationItemResponseDto;
}

function EvaluationText({ evaluationData }: EvaluationTextProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center">
      <div className="relative h-[626px] w-[290px]">
        <div className="-rotate-1 absolute top-17 right-8 left-8">
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
          <div className="mb-2 flex flex-col gap-y-1 text-left">
            {evaluationData.hashtagList.map((hashtag) => (
              <div
                key={`hashtag-${hashtag}`}
                className="font-['Elice_Digital_Baeum'] font-normal text-[12px] text-gray-500 leading-tight"
              >
                {hashtag}
              </div>
            ))}
          </div>
          <div className="-translate-y-1/2 absolute top-51 right-0 transform">
            <img
              src="/png/iconArrowDown.png"
              className="h-6 w-6"
              alt="iconArrowDown"
            />
          </div>
          <div className="mb-0 h-px w-full border-[#676767] border-t border-dashed" />
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
        <div className="-translate-x-1/2 absolute top-0 left-1/2">
          <img src="/png/iconX.png" className="h-[85px] w-[85px]" alt="X" />
        </div>
        <div className="absolute top-23 right-13">
          <img
            src="/png/iconStarBlack.png"
            className="h-[24px] w-[24px]"
            alt="iconStarBlack"
          />
        </div>
        <div className="-left-5 -rotate-10 absolute top-[calc(50%-8px)] z-30">
          <img
            src="/png/iconSmile.png"
            className="h-[106px] w-[106px]"
            alt="smile"
          />
        </div>
        <div className="-rotate-1 absolute top-14 left-19">
          <img
            src="/png/iconTagNormal.png"
            className="h-[21px] w-[63px]"
            alt="iconTagNormal"
          />
        </div>
        <div className="absolute top-58 right-5 rotate-10">
          <img
            src="/png/iconHanger.png"
            className="h-[38px] w-[46px]"
            alt="iconHanger"
          />
        </div>
        <div className="-rotate-15 -z-10 absolute bottom-19 left-11">
          <img
            src="/png/iconTshirt.png"
            className="h-[64px] w-[84px]"
            alt="iconTshirt"
          />
        </div>
        <div className="-rotate-30 -right-10 absolute bottom-30 z-40">
          <img
            src="/png/iconDescription.png"
            className="h-[48px] w-[142px]"
            alt="iconDescription"
          />
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute top-21 left-1/2 z-20 transform">
        <div className="h-px w-58 border-2 border-t" />
      </div>

      <div className="absolute inset-0 top-[calc(33.333%-20px)] z-8 flex items-center justify-center">
        <div className="-rotate-1 transform">
          <img
            className="h-[226px] w-[226px] object-cover"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-20 left-1/2 z-20 transform">
        <div className="text-center">
          <span className="font-['NeoDunggeunmo'] text-black text-xl">
            Score:{" "}
          </span>
          <span className="font-['NeoDunggeunmo'] font-bold text-2xl text-black">
            {evaluationData.totalScore.toString().padStart(2, "0")}점
          </span>
        </div>
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-19 left-1/2 z-20 transform">
        <div className="h-px w-58 border-2 border-t" />
      </div>

      <div className="-rotate-1 -translate-x-1/2 absolute bottom-13 left-1/2 z-20 transform">
        <div className="text-center">
          <span className="font-['NeoDunggeunmo'] text-[#676767] text-[12px]">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "long",
              day: "numeric",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
