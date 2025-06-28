import type { EmblaOptionsType } from "embla-carousel";
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
    <div className="mx-auto w-full max-w-lg">
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

export default CarouselContainer;
