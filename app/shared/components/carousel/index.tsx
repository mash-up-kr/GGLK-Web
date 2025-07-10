import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";

export type CarouselSlide = {
  id: number;
  image: string;
  alt: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  // 이미지만 보이는 모드에서는 false, 화살표가 필요한 모드에서는 true로 설정해서 사용해주세요!
  fullWidthSlide?: boolean;
  onSelectIndexChange?: (index: number) => void;
  theme?: "light" | "dark";
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const { slides, options, fullWidthSlide } = props;
  const theme = props.theme ?? "dark";
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const onSelect = () => {
      if (!emblaApi) return;
      const newIndex = emblaApi.selectedScrollSnap();
      setSelectedIndex((prev) => (prev !== newIndex ? newIndex : prev));
      props.onSelectIndexChange?.(newIndex);
    };

    emblaApi?.on("select", onSelect);
    onSelect();

    return () => {
      emblaApi?.off("select", onSelect);
    };
  }, [emblaApi, props.onSelectIndexChange]);

  const getButtonColors = (isSelected: boolean) => {
    if (theme === "light") {
      return isSelected ? "bg-[#373737]" : "bg-white";
    }
    return isSelected ? "bg-white" : "bg-[#373737]";
  };

  return (
    <section className="mx-auto">
      <div
        className={`relative mx-auto ${fullWidthSlide ? "h-[670px] w-[375px]" : "h-[560px]"}`}
      >
        <div className="h-full overflow-hidden" ref={emblaRef}>
          <div className={`flex h-full ${!fullWidthSlide ? "-ml-4" : ""}`}>
            {slides.map((slide, index) => (
              <div
                className={`
                  ${fullWidthSlide ? "w-full flex-none" : "w-[330px] flex-none bg-gray-200 pl-4"} h-full min-w-0 transform-gpu`}
                key={slide.id}
              >
                <div className="relative">
                  <img
                    className={`h-full w-full object-cover transition-all duration-300 ${
                      selectedIndex === index ? "opacity-100" : "opacity-60"
                    }
                  `}
                    src={slide.image}
                    alt={slide.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-4 left-1/2 z-10 flex cursor-pointer items-center justify-center space-x-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => emblaApi?.scrollTo(index)}
              className={`h-2 w-2 rounded-full transition-colors duration-200 ${getButtonColors(selectedIndex === index)}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Carousel;
