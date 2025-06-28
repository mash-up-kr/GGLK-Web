import type { CarouselSlide } from "../components/carousel";

export interface CarouselItemProps {
  slides: CarouselSlide[];
  slideIndex: number;
  onSelectIndexChange?: (index: number) => void;
}
