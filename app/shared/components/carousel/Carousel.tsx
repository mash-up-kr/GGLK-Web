import type { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React, { useEffect, useState } from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./CarouselButtons";

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
  }, [emblaApi]);

  return (
    <section className="mx-auto">
      <div className="">
        <div className="overflow-hidden" ref={emblaRef}>
          <div className={`flex ${!fullWidthSlide ? "-ml-4" : ""}`}>
            {slides.map((slide, index) => (
              <div
                className={`
                  ${fullWidthSlide ? "flex-none w-full" : "flex-none pl-4"} 
                  max-h-full min-w-0 px-2 transform-gpu
                `}
                key={slide.id}
              >
                <div className="aspect-[4/3] w-[306px] h-[511px] mx-auto relative">
                  <img
                    className={`
                    w-full h-full
                    object-cover rounded-md transition-all duration-300
                    ${
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
        <div className="w-full max-w-[150px] flex mx-auto mt-4 justify-between items-center">
          <div className="w-8 flex justify-center">
            {showArrows && (
              <PrevButton
                onClick={onPrevButtonClick}
                disabled={prevBtnDisabled}
              />
            )}
          </div>
          <div className="flex justify-center mt-2 items-center space-x-2">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => emblaApi?.scrollTo(index)}
                className={`
                        w-2 h-2 rounded-full border
                        ${
                          selectedIndex === index
                            ? "bg-black"
                            : "bg-white border-gray-400"
                        }
                      `}
              />
            ))}
          </div>
          <div className="w-8 flex justify-center">
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
