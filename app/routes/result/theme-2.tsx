import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme2({
  slides,
  slideIndex,
  onSelectIndexChange,
}: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-6 left-6">
          <img
            src="/png/iconHanger.png"
            className="h-5 w-5 opacity-70"
            alt="hanger"
          />
        </div>
        <div className="absolute top-4 right-8">
          <img
            src="/png/iconTshirt.png"
            className="h-6 w-6 opacity-60"
            alt="tshirt"
          />
        </div>

        <div className="absolute top-1/3 right-6">
          <img
            src="/png/iconTodaysLook.png"
            className="h-4 w-4 opacity-50"
            alt="todays-look"
          />
        </div>
        <div className="absolute top-1/2 left-6">
          <img
            src="/png/iconDescription.png"
            className="h-3 w-3 opacity-40"
            alt="description"
          />
        </div>

        <div className="absolute bottom-12 left-8">
          <img
            src="/png/iconTagEasy.png"
            className="h-4 w-4 opacity-60"
            alt="tag-easy"
          />
        </div>
        <div className="absolute right-6 bottom-6">
          <img
            src="/png/iconTagNormal.png"
            className="h-5 w-5 opacity-50"
            alt="tag-normal"
          />
        </div>
      </div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative">
          <img
            className="h-[85%] w-auto object-contain shadow-md"
            src={slides[slideIndex].image}
            alt={slides[slideIndex].alt}
          />
          <div className="-top-2 -right-2 absolute">
            <img
              src="/png/iconTagSpicy.png"
              className="h-6 w-6"
              alt="tag-spicy"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
