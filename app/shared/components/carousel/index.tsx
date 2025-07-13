import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import { memo, useCallback, useEffect, useRef, useState } from "react";
import { cn } from "~/shared/utils/classname-utils";

const TWEEN_FACTOR_BASE = 0.84;

const numberWithinRange = (number: number, min: number, max: number): number =>
  Math.min(Math.max(number, min), max);

export type CarouselSlide = {
  id: number;
  image?: string;
  alt?: string;
  children?: React.ReactNode;
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

  const tweenFactor = useRef(0);

  const tweenOpacity = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        for (const slideIndex of slidesInSnap) {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            for (const loopItem of engine.slideLooper.loopPoints) {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            }
          }

          const tweenValue = 1 - Math.abs(diffToTarget * tweenFactor.current);
          const opacity = numberWithinRange(tweenValue, 0.3, 1).toString();
          emblaApi.slideNodes()[slideIndex].style.opacity = opacity;
        }
      });
    },
    [],
  );

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  useEffect(() => {
    if (!emblaApi) return;

    setTweenFactor(emblaApi);
    tweenOpacity(emblaApi);
    emblaApi
      .on("reInit", setTweenFactor)
      .on("reInit", tweenOpacity)
      .on("scroll", tweenOpacity)
      .on("slideFocus", tweenOpacity);
  }, [emblaApi, setTweenFactor, tweenOpacity]);

  const getButtonColors = (isSelected: boolean) => {
    if (theme === "light") {
      return isSelected ? "bg-[#373737]" : "bg-white";
    }
    return isSelected ? "bg-white" : "bg-[#373737]";
  };

  return (
    <section
      className={cn(
        fullWidthSlide ? "mx-auto" : "flex h-full flex-col overflow-hidden",
      )}
    >
      <div
        className={`relative mx-auto ${fullWidthSlide ? "h-[670px] w-[375px]" : "w-5/6 min-w-[280px] max-w-md grow"}`}
      >
        <div className="relative mx-auto h-full" ref={emblaRef}>
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div
                className={`flex-none ${fullWidthSlide ? "h-full w-full flex-none" : "flex w-full items-center justify-center"} min-w-0 transform-gpu`}
                key={slide.id}
              >
                {slide.children ? (
                  <div className="h-9/10">{slide.children}</div>
                ) : (
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
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-3 left-1/2 z-10 flex cursor-pointer items-center justify-center space-x-2">
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

Carousel.displayName = "Carousel";

export default memo(Carousel);
