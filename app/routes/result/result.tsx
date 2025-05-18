import React from "react";
import CarouselContainer from "~/shared/components/carousel/CarouselContainer";

const createSlides = (count: number) => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    image: `/app/shared/images/${index + 1}.png`,
    alt: `img-alt-${index + 1}`,
  }));
};

export default function ResultPage() {
  const [slideCount, setSlideCount] = React.useState(3); // 이번 스펙 기준 3장으로 설정
  const slides = createSlides(slideCount);

  return (
    <div className="p-4">
      <div className="carousel-container">
        <CarouselContainer slides={slides} />
      </div>
    </div>
  );
}
