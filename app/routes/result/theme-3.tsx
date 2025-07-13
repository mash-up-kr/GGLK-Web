import type { CarouselItemProps } from "~/shared/types/carousel-item";

export default function Theme3({ slides, slideIndex }: CarouselItemProps) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <div className="-translate-x-1/2 absolute top-20 left-1/2 z-30 w-[300px]">
        <img src="/png/IconDragedText.png" alt="IconDragedText" />
      </div>
      <div className="absolute inset-0 z-10 flex items-center justify-center">
        <img
          src="/png/photobooth.png"
          className="h-[420px] w-[320px] object-contain"
          alt="photobooth"
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
      <div className="absolute bottom-32 left-16 z-20">
        <img
          src="/png/iconFile.png"
          className="h-[40px] w-[40px]"
          alt="iconFile"
        />
      </div>

      <div className="absolute bottom-28 left-20 z-20">
        <img
          src="/png/iconFile.png"
          className="h-[35px] w-[35px]"
          alt="iconFile"
        />
      </div>
      <div className="absolute right-8 bottom-36 z-5">
        <img
          src="/png/iconFile.png"
          className="h-[30px] w-[30px]"
          alt="iconFile"
        />
      </div>

      <div className="absolute inset-0 z-25 flex items-center justify-center">
        <div className="absolute inset-0 top-4 flex items-center justify-center">
          <img
            className="h-[288px] w-[288px] rounded-b-md object-cover"
            src={"/png/3.png"}
            alt="dog"
          />
        </div>
      </div>
    </div>
  );
}
