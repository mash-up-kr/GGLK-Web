import { useState } from "react";
import { useNavigate } from "react-router";
import BottomSheet, {
  type BottomSheetAction,
} from "~/shared/components/bottomSheet/bottom-sheet";
import type { CarouselSlide } from "~/shared/components/carousel";
import CarouselContainer from "~/shared/components/carousel/carousel-container";
import ReanalyzeContent from "./reanalyze-content";
import ShareContent from "./share-content";

const createSlides = (count: number): CarouselSlide[] => {
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    image: `/png/${index + 1}.png`,
    alt: `img-alt-${index + 1}`,
  }));
};

export default function ResultPage() {
  const navigate = useNavigate();
  const [contentType, setContentType] = useState<"share" | "reanalyze">(
    "share",
  );
  const [slideCount] = useState(3); // 이번 스펙 기준 3장으로 설정
  const slides = createSlides(slideCount);

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const handleCopyLink = async () => {
    console.log("---------");
    try {
      const homeUrl = `${window.location.origin}/`; // 홈 URL
      await navigator.clipboard.writeText(homeUrl);
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
    <div className="h-full w-full bg-[#181818] p-4">
      <CarouselContainer slides={slides} fullWidthSlide={true} />
      <div className="m-10 flex h-[46px] flex-row items-center justify-center gap-x-[10px]">
        <button
          type="button"
          onClick={() => setIsBottomSheetOpen(true)}
          className="flex h-[46px] w-[161px] items-center justify-center rounded-tr-xl rounded-bl-xl bg-[#373737] py-3 text-sm text-white"
        >
          <img
            src="/png/IconShare2.png"
            className="mr-1 h-[24px] w-[24px]"
            alt="icon-share"
          />
          공유하기
        </button>
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          {contentType === "share" ? (
            <ShareContent
              mainActions={mainActions}
              secondaryActions={secondaryActions}
            />
          ) : (
            <ReanalyzeContent
              onKakaoLogin={() => console.log("카카오 로그인 로직")} //handleKakaoLogin
              onClose={() => setIsBottomSheetOpen(false)}
            />
          )}
        </BottomSheet>

        <button
          type="button"
          onClick={() => navigate("/")}
          className="h-[46px] w-[161px] rounded-tr-xl rounded-bl-xl bg-[#373737] py-3 text-sm text-white"
        >
          다시하기
        </button>
      </div>
    </div>
  );
}
