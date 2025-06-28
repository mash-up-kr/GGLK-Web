import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme1({
  slides,
  slideIndex,
  onSelectIndexChange,
}: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-4 left-4">
          <img
            src="/png/iconStarBlack.png"
            className="h-6 w-6 opacity-60"
            alt="star"
          />
        </div>
        <div className="absolute top-8 right-6">
          <img
            src="/png/iconCircle.png"
            className="h-4 w-4 opacity-40"
            alt="circle"
          />
        </div>

        <div className="absolute top-1/3 left-8">
          <img
            src="/png/iconSmile.png"
            className="h-5 w-5 opacity-50"
            alt="smile"
          />
        </div>
        <div className="absolute top-1/2 right-8">
          <img
            src="/png/iconRectangle.png"
            className="h-3 w-3 opacity-30"
            alt="rectangle"
          />
        </div>

        <div className="absolute bottom-16 left-6">
          <img
            src="/png/iconPin.png"
            className="h-4 w-4 opacity-60"
            alt="pin"
          />
        </div>
        <div className="absolute right-4 bottom-8">
          <img
            src="/png/iconStarPearl.png"
            className="h-5 w-5 opacity-50"
            alt="star-pearl"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="rotate-1 transform">
          <img
            className="h-[80%] w-auto object-contain shadow-lg"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
        </div>
      </div>
    </div>
  );
}
