import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme2({ slides, slideIndex }: CarouselItemProps) {
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
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img
            src="/png/iconFrame.png"
            className="h-[289px] w-[365px] object-contain"
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
    </div>
  );
}
