import type { EvaluationItemResponseDto } from "~/api/model";
import type { CarouselSlide } from "~/shared/components/carousel";

export interface CarouselItemProps {
  slides: CarouselSlide[];
  slideIndex: number;
  onSelectIndexChange?: (index: number) => void;
  evaluationData?: EvaluationItemResponseDto;
}
