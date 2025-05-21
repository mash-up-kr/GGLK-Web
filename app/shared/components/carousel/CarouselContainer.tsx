import type { EmblaOptionsType } from "embla-carousel";
import Carousel, { type CarouselSlide } from "./Carousel";

type CarouselContainerProps = {
  slides: CarouselSlide[];
  options?: EmblaOptionsType;
  showArrows?: boolean;
  fullWidthSlide?: boolean;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  slides,
  options = { loop: true },
  fullWidthSlide
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel slides={slides} options={options} fullWidthSlide={fullWidthSlide} />
    </div>
  );
};

export default CarouselContainer;
