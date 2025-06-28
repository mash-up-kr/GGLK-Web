import type { EmblaOptionsType } from "embla-carousel";
import type { CarouselSlide } from ".";
import Carousel from ".";

type CarouselContainerProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  fullWidthSlide?: boolean;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  slides,
  options = { loop: true },
  fullWidthSlide,
}) => {
  return (
    <div className="mx-auto w-full max-w-lg">
      <Carousel
        theme="dark"
        slides={slides}
        options={options}
        fullWidthSlide={fullWidthSlide}
      />
    </div>
  );
};

export default CarouselContainer;
