import { useState } from "react";
import BottomSheet from "~/shared/components/bottomSheet/bottom-sheet";
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
  const [slideCount] = useState(3); // 이번 스펙 기준 3장으로 설정
  const slides = createSlides(slideCount);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  return (
    <div className="p-4">
      <CarouselContainer slides={slides} fullWidthSlide={true} />
      <div className="m-10 flex flex-col items-center justify-center">
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="w-[150px] rounded-xl bg-gray-800 py-3 font-bold text-white transition-colors hover:bg-black"
        >
          공유하기
        </button>

        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
          title="공유하기"
          imageUrl={slides[0]?.image || ""} // TO-BE: 캐러셀의 현재 이미지를 선택해야 함
          shareUrl={window.location.href}
          shareTitle="FIXME - 이미지 타이틀로 변경"
          shareText="공유하기 클릭"
        />
      </div>
    </div>
  );
}
