import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme2({
  slides,
  slideIndex,
  onSelectIndexChange,
}: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0 z-10">
        <div className="absolute right-4 bottom-30">
          <img
            src="/png/iconDescription.png"
            className="h-[48px] w-[142px]"
            alt="iconDescription"
          />
        </div>
        <div className="absolute top-20 right-4">
          <img
            src="/png/iconTodaysLook.png"
            className="h-[48px] w-[142px]"
            alt="iconTodaysLook"
          />
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img
            src="/png/iconFrame.png"
            className="h-[226px] w-[226px] object-contain"
            alt="icon-frame"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <img
              className="h-[155px] w-[155px] rotate-3"
              src={slides[slideIndex].image}
              alt={slides[slideIndex].alt}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
