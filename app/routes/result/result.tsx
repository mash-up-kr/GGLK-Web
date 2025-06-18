import { useState } from "react";
import BottomSheet, {
  type BottomSheetAction,
} from "~/shared/components/bottomSheet/bottom-sheet";
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
  const handleCopyLink = async () => {
    console.log("---------");
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/`);
      alert("홈 링크 복사됨");
      console.log("copy!");
    } catch (err) {
      alert("링크 복사 실패 ㅠ");
      console.error(err);
    }
  };

  // FIXME: 카카오톡 공유 로직
  const handleKakaoShare = async () => {
    try {
      // TODO
      console.log("카카오톡 공유 func 실행");
      alert("카카오톡 공유");
    } catch (err) {
      console.error("카카오톡 공유 실패:", err);
    }
  };

  // FIXME: 이미지 저장 로직
  const handleSaveImage = async () => {
    try {
      // TODO
      console.log("이미지 저장 func 실행");
      alert("이미지 저장");
    } catch (err) {
      console.error("이미지 저장 실패:", err);
    }
  };

  // 메인 액션
  const mainActions: BottomSheetAction[] = [
    {
      id: "copy-link",
      label: "링크 복사",
      icon: "/public/png/iconShare.png",
      onClick: handleCopyLink,
      disabled: false,
    },
    {
      id: "kakao-share",
      label: "카카오톡",
      icon: "/public/png/iconKaKaoTalk.png",
      onClick: handleKakaoShare,
      disabled: false,
    },
  ];

  // 구분선 아래의 세컨더리 액션
  const secondaryActions: BottomSheetAction[] = [
    {
      id: "save-image",
      label: "이미지 저장",
      icon: "/public/png/iconSave.png",
      onClick: handleSaveImage,
      disabled: false,
    },
  ];

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
          mainActions={mainActions}
          secondaryActions={secondaryActions}
        />
      </div>
    </div>
  );
}
