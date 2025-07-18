import type {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import type { ReactNode } from "react";
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
  themeComponent?: (slides: CarouselSlide[], slideIndex: number) => ReactNode;
};

type CarouselProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  fullWidthSlide?: boolean;
  onSelectIndexChange?: (index: number) => void;
  theme?: "light" | "dark";
  smoothTransition?: boolean;
};

const Carousel: React.FC<CarouselProps> = (props) => {
  const { slides, options, fullWidthSlide, smoothTransition = false } = props;
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

    if (smoothTransition) {
      setTweenFactor(emblaApi);
      tweenOpacity(emblaApi);
      emblaApi
        .on("reInit", setTweenFactor)
        .on("reInit", tweenOpacity)
        .on("scroll", tweenOpacity)
        .on("slideFocus", tweenOpacity);
    }
  }, [emblaApi, setTweenFactor, tweenOpacity, smoothTransition]);

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
        className={cn(
          "relative mx-auto",
          fullWidthSlide
            ? "slide-area h-[670px] w-[375px]"
            : "w-5/6 min-w-[280px] max-w-md grow",
        )}
      >
        <div
          className={cn(
            fullWidthSlide ? "h-full overflow-hidden" : "relative h-full",
          )}
          ref={emblaRef}
        >
          <div className="flex h-full">
            {slides.map((slide, index) => (
              <div
                className={cn(
                  "w-full min-w-0 flex-none transform-gpu",
                  fullWidthSlide
                    ? "h-full"
                    : "flex w-full items-center justify-center",
                )}
                key={slide.id}
              >
                {slide.children ? (
                  <div className="h-9/10">{slide.children}</div>
                ) : (
                  <div className="relative h-full">
                    {slide.themeComponent ? (
                      slide.themeComponent(slides, index)
                    ) : (
                      <img
                        className={cn(
                          "h-full w-full object-cover transition-all duration-300",
                          selectedIndex === index
                            ? "opacity-100"
                            : "opacity-60",
                        )}
                        src={slide.image}
                        alt={slide.alt}
                      />
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div className="-translate-x-1/2 absolute bottom-0 left-1/2 z-10 flex cursor-pointer items-center justify-center space-x-2">
          {slides.map((slide, index) => (
            <button
              type="button"
              key={slide.id}
              onClick={() => {
                emblaApi?.scrollTo(index);
              }}
              className={cn(
                "h-2 w-2 rounded-full transition-colors duration-200",
                getButtonColors(selectedIndex === index),
              )}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

Carousel.displayName = "Carousel";

export default memo(Carousel);
