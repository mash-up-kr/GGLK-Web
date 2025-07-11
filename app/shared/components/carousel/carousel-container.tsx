import type { EmblaOptionsType } from "embla-carousel";
import { memo } from "react";
import type { CarouselSlide } from ".";
import Carousel from ".";

type CarouselContainerProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  fullWidthSlide?: boolean;
  onSelectIndexChange?: (index: number) => void;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  slides,
  options = { loop: true },
  fullWidthSlide,
  onSelectIndexChange,
}) => {
  return (
    <div className="h-full w-full">
      <Carousel
        theme="dark"
        slides={slides}
        options={options}
        fullWidthSlide={fullWidthSlide}
        onSelectIndexChange={onSelectIndexChange}
      />
    </div>
  );
};

export default memo(CarouselContainer);
