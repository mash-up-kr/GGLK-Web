import { type EmblaOptionsType } from "embla-carousel";
import React from "react";
import EmblaCarousel from "~/shared/components/carousel/EmblaCarousel";

const OPTIONS: EmblaOptionsType = { loop: true }

const createSlides = (count: number) => {

  return Array.from({ length: count }, (_, index) => ({
    id: index,
    image: `/app/shared/images/${index + 1}.png`,
    alt: `img-alt-${index + 1}`
  }));
};

export default function ResultPage() {
  const [slideCount, setSlideCount] = React.useState(3); // 이번 스펙 기준 3장으로 설정
  const slides = createSlides(slideCount);

  const handleSlideCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const count = parseInt(e.target.value);
    if (!isNaN(count) && count > 0) {
      setSlideCount(count);
    }
  };

    return (
      <div>
        <input 
            id="slide-count"
            type="number" 
            min="1"
            value={slideCount} 
            onChange={handleSlideCountChange}
          />
        <div className="carousel-container">
          <EmblaCarousel 
            slides={slides} 
            options={OPTIONS}
            showArrows={true}
          />
        </div>
    </div>
    )
  }