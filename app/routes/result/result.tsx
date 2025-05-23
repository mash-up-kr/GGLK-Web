import React from "react";
import type { CarouselSlide } from "~/shared/components/carousel";
import CarouselContainer from "~/shared/components/carousel/carousel-container";

const createSlides = (count: number): CarouselSlide[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    image: `/public/png/${index + 1}.png`,
    alt: `img-alt-${index + 1}`,
  }));
};

export default function ResultPage() {
  const [slideCount, setSlideCount] = React.useState(3); // 이번 스펙 기준 3장으로 설정
  const slides = createSlides(slideCount);

  return (
    <div className="p-4">
      <CarouselContainer slides={slides} fullWidthSlide={true} />
    </div>
  );
}
