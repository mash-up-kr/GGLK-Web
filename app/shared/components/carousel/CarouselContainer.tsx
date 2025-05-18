import type { EmblaOptionsType } from "embla-carousel";
import Carousel, { type SlideProps } from "./Carousel";

type CarouselContainerProps = {
  slides: SlideProps;
  options?: EmblaOptionsType;
  showArrows?: boolean;
};

const CarouselContainer: React.FC<CarouselContainerProps> = ({
  slides,
  options = { loop: true },
}) => {
  return (
    <div className="w-full max-w-lg mx-auto">
      <Carousel slides={slides} options={options} fullWidthSlide={true} />
    </div>
  );
};

export default CarouselContainer;
