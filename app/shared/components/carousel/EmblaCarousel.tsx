
import type { EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import React from 'react'
import "../../../css/embla.css"
import { NextButton, PrevButton, usePrevNextButtons } from './EmblaCarouselArrowButtons'

type SlideProps = {
  id: number
  image: string
  alt: string
}[]

type PropType = {
  slides:  SlideProps
  options?: EmblaOptionsType
  showArrows?: boolean; 
}

const EmblaCarousel: React.FC<PropType> = (props) => {
  const { slides, options, showArrows = false } = props; // default는 버튼 숨기도록 설정
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {slides.map((slide) => (
            <div className="embla__slide" key={slide.id}>
                <div className="embla__slide__inner">
                  <img 
                    className="embla__slide__img" 
                    src={slide.image} 
                    alt={slide.alt} 
                  />
                </div>
            </div>
          ))}
        </div>
      </div>
      {showArrows && (
        <div className="embla__controls">
          <div className="embla__buttons">
            <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
            <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
          </div>
        </div>
      )}
    </section>
  );
};

export default EmblaCarousel;