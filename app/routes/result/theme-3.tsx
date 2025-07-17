import type { CarouselItemProps } from "~/shared/types/carousel-item";

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
        <div className="absolute inset-0 flex flex-col justify-between p-4">
          <div
            className="flex flex-col space-y-1 p-2 text-gray-300"
            style={{ marginTop: "10%" }}
          >
            <div className="flex flex-col items-start justify-start gap-x-1">
              <div className="text-[9px]">Title</div>

              <div className="font-['AppleSDGothicNeo'] font-bold text-black text-lg leading-tight">
                {evaluationData.title}
              </div>
            </div>
            <div className="flex flex-row items-start gap-x-1 text-[9px]">
              <span>Name: </span>
              <span className="flex flex-row items-start gap-x-1">
                <span className="font-['AppleSDGothicNeo'] text-black">
                  {evaluationData.nickname}
                </span>
              </span>
            </div>
            <div className="flex flex-row items-start gap-x-1">
              <div className="text-[9px]">Hash Tag:</div>
              <div className="flex flex-row items-start gap-x-1 text-[9px]">
                <div className="grid grid-cols-2 gap-x-0.5">
                  {evaluationData.hashtagList.map((hashtag) => (
                    <span
                      key={`hashtag-${hashtag}`}
                      className="font-['Elice_Digital_Baeum'] font-normal text-[9px] text-blue-500"
                    >
                      {hashtag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-col space-y-1">
            <hr className="w-full border-[#676767] border-t" />
            <div className="text-center">
              <span className="font-['NeoDunggeunmo'] text-[17px] text-black">
                Score:{" "}
              </span>
              <span className="font-['NeoDunggeunmo'] font-bold text-[17px] text-black">
                {evaluationData.totalScore.toString().padStart(2, "0")}점
              </span>
            </div>
          </div>
        </div>
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
    </div>
  );
}
