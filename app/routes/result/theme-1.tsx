import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme1({
  slides,
  slideIndex,
  onSelectIndexChange,
}: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center">
        <img
          src="/png/theme1.png"
          className="h-[626px] w-[290px] object-cover"
          alt="theme1-background"
        />
      </div>

      <div className="absolute inset-0 z-10">
        <div className="absolute top-4 left-4">
          <img
            src="/png/iconStarBlack.png"
            className="h-[24px] w-[24px]"
            alt="star"
          />
        </div>
        <div className="absolute top-1/3 left-8">
          <img
            src="/png/iconSmile.png"
            className="top-5 left-5 h-[106px] w-[106px]"
            alt="smile"
          />
        </div>
        <div className="absolute top-0 right-1/2">
          <img src="/png/iconX.png" className="h-[85px] w-[85px]" alt="X" />
        </div>

        <div className="absolute right-4 bottom-30 ">
          <img
            src="/png/iconDescription.png"
            className="h-[48px] w-[142px]"
            alt="iconDescription"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="-rotate-1 transform">
          <img
            className="h-[226px] w-[226px] object-contain"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
        </div>
      </div>
    </div>
  );
}
