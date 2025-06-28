import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme3({
  slides,
  slideIndex,
  onSelectIndexChange,
}: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-4 left-8">
          <img
            src="/png/iconArrowDown.png"
            className="h-5 w-5 opacity-60"
            alt="arrow-down"
          />
        </div>
        <div className="absolute top-8 right-4">
          <img src="/png/iconX.png" className="h-4 w-4 opacity-50" alt="x" />
        </div>

        <div className="absolute top-1/3 left-4">
          <img
            src="/png/iconStarBlack.png"
            className="h-6 w-6 opacity-40"
            alt="star"
          />
        </div>
        <div className="absolute top-1/2 right-4">
          <img
            src="/png/iconCircle.png"
            className="h-5 w-5 opacity-30"
            alt="circle"
          />
        </div>

        <div className="absolute bottom-16 left-6">
          <img
            src="/png/iconSmile.png"
            className="h-4 w-4 opacity-60"
            alt="smile"
          />
        </div>
        <div className="absolute right-8 bottom-8">
          <img
            src="/png/iconRectangle.png"
            className="h-3 w-3 opacity-50"
            alt="rectangle"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img
            className="h-[90%] w-auto object-contain shadow-lg"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
          <div className="-top-3 -left-3 absolute">
            <img
              src="/png/iconStarPearl.png"
              className="h-7 w-7"
              alt="star-pearl"
            />
          </div>
          <div className="-bottom-2 -right-3 absolute">
            <img src="/png/iconPin.png" className="h-5 w-5" alt="pin" />
          </div>
        </div>
      </div>
    </div>
  );
}
