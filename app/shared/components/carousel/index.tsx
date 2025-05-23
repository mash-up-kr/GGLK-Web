import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { useEffect, useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./carousel-buttons";

export type CarouselSlide = {
  id: number;
  image: string;
  alt: string;
};

type CarouselProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  showArrows?: boolean;
  // 이미지만 보이는 모드에서는 false, 화살표가 필요한 모드에서는 true로 설정해서 사용해주세요!
  fullWidthSlide?: boolean;
  onSelectIndexChange?: (index: number) => void;
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const { slides, options, fullWidthSlide } = props;
  const showArrows = props.showArrows ?? fullWidthSlide;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
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

  return (
    <section className="mx-auto">
      <div className="">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className={`flex ${!fullWidthSlide ? "-ml-4" : ""}`}>
            {slides.map((slide, index) => (
              <div
                className={`
                  ${fullWidthSlide ? "w-full flex-none" : "flex-none pl-4"} max-h-full min-w-0 transform-gpu px-2 `}
                key={slide.id}
              >
                <div className="relative mx-auto aspect-[4/3] h-[511px] w-[306px]">
                  <img
                    className={`h-full w-full rounded-md object-cover transition-all duration-300 ${
                      selectedIndex === index
                        ? "opacity-100 blur-0"
                        : "opacity-70 blur-sm"
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
        <div className="mx-auto mt-4 flex w-full max-w-[150px] items-center justify-between">
          <div className="flex w-8 justify-center">
            {showArrows && (
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            )}
          </div>
          <div className="mt-2 flex items-center justify-center space-x-2">
            {slides.map((slide, index) => (
              <button
                type="button"
                key={slide.id}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`h-2 w-2 rounded-full border ${
                  selectedIndex === index
                    ? "bg-black"
                    : "border-gray-400 bg-white"
                }
                      `}
              />
            ))}
          </div>
          <div className="flex w-8 justify-center">
            {showArrows && (
              <NextButton
                onClick={onNextButtonClick}
                disabled={nextBtnDisabled}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Carousel;
