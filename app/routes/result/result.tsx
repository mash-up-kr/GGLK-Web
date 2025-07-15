import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useEvaluationControllerCheckIfGuestUserUseChance } from "~/api/endpoints/api";
import BottomSheet, {
  type BottomSheetAction,
  BOTTOM_SHEET_HEIGHT,
} from "~/shared/components/bottomSheet/bottom-sheet";
import type { CarouselSlide } from "~/shared/components/carousel";
import CarouselContainer from "~/shared/components/carousel/carousel-container";
import { useAuthentication } from "~/shared/hooks/use-authentication";
import { useKakaoScript } from "~/shared/hooks/use-kakao-script";
import { toast } from "~/shared/stores/toast-store";
import ReanalyzeContent from "./reanalyze-content";
import ShareContent from "./share-content";
import Theme1 from "./theme-1";
import Theme2 from "./theme-2";
import Theme3 from "./theme-3";

const createThemeSlides = (): CarouselSlide[] => {
  return [
    {
      id: 0,
      image: "/png/1.png",
      alt: "theme-1",
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme1 slides={slides} slideIndex={slideIndex} />
      ),
    },
    {
      id: 1,
      image: "/png/2.png",
      alt: "theme-2",
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme2 slides={slides} slideIndex={slideIndex} />
      ),
    },
    {
      id: 2,
      image: "/png/3.png",
      alt: "theme-3",
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme3 slides={slides} slideIndex={slideIndex} />
      ),
    },
  ];
};

const getThemeBackgroundClass = (themeIndex: number): string => {
  switch (themeIndex) {
    case 0:
      return "bg-[#181818]";
    case 2:
      return "";
    default:
      return "bg-[#181818]";
  }
};

export default function ResultPage() {
  const navigate = useNavigate();
  const { authorize, sendDefault } = useKakaoScript();
  const { isAuthenticated } = useAuthentication();
  const guestUsedCheck = useEvaluationControllerCheckIfGuestUserUseChance();

  const [contentType, setContentType] = useState<"share" | "reanalyze">(
    "share",
  );
  const slides = createThemeSlides();

  const [selectedThemeIndex, setSelectedThemeIndex] = useControllableState({
    prop: undefined,
    defaultProp: 0,
    onChange: (index: number) => {
      console.log("테마 변경:", index);
    },
  });

  // 캐러셀 인덱스 변경되면 테마 인덱스도 변경
  const handleSlideIndexChange = (index: number) => {
    setSelectedThemeIndex(index);
  };

  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const handleCopyLink = async () => {
    try {
      const homeUrl = `${window.location.origin}/`; // 홈 URL
      await navigator.clipboard.writeText(homeUrl);
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.success("링크 복사 완료!", {
        offset: { y: bottomSheetHeight + 4 },
      });
      console.log("copy!");
    } catch (err) {
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.error("링크 복사 실패 ㅠ", {
        offset: { y: bottomSheetHeight + 4 },
      });
      console.error(err);
    }
  };

  // 카카오톡 공유 로직
  const handleKakaoShare = async () => {
    try {
      // mock data
      const shareData = {
        objectType: "feed" as const,
        content: {
          title: "OOTD 로스팅 결과",
          description: "내 스타일을 로스팅해보세요!",
          imageUrl: `${window.location.origin}/png/og-image-800-400.png`,
          link: {
            webUrl: window.location.origin,
            mobileWebUrl: window.location.origin,
          },
        },
        buttons: [
          {
            title: "분석하기",
            link: {
              webUrl: window.location.origin,
              mobileWebUrl: window.location.origin,
            },
          },
        ],
      };

      sendDefault(shareData);
    } catch (err) {
      console.error("카카오톡 공유 실패:", err);
    }
  };

  // 카카오 로그인 처리
  const handleKakaoLogin = async () => {
    try {
      authorize();
    } catch (error) {
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.error("카카오 로그인 실패", {
        offset: { y: bottomSheetHeight + 4 },
      });
      console.error("카카오 로그인 실패:", error);
    }
  };

  // 다시하기 버튼 클릭 시 게스트 사용 여부 확인하게
  const handleReanalyze = async () => {
    if (isAuthenticated) {
      // 로그인된 사용자는 바로 홈으로 이동
      navigate("/");
      return;
    }

    // 게스트 사용자라면 사용 여부 확인하게
    try {
      guestUsedCheck.refetch().then((result) => {
        if (result.data) {
          // 이미 기회를 사용한 경우 - 카카오 로그인 필요
          setContentType("reanalyze");
          setIsBottomSheetOpen(true);
        } else {
          // 아직 기회가 남아있는 경우 - 홈으로 이동
          navigate("/");
        }
      });
    } catch (error) {
      console.error("게스트 사용 여부 확인 실패:", error);
      // 에러 발생 시 홈으로 이동
      navigate("/");
    }
  };

  // FIXME: 이미지 저장 로직
  const handleSaveImage = async () => {
    try {
      // TODO
      console.log("이미지 저장 func 실행");
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.success("이미지 저장 완료!", {
        offset: { y: bottomSheetHeight + 4 },
      });
    } catch (err) {
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.error("이미지 저장 실패", { offset: { y: bottomSheetHeight + 4 } });
      console.error("이미지 저장 실패:", err);
    }
  };

  // 메인 액션
  const mainActions: BottomSheetAction[] = [
    {
      id: "copy-link",
      label: "링크 복사",
      icon: "/png/IconShare.png",
      onClick: handleCopyLink,
      disabled: false,
    },
    {
      id: "kakao-share",
      label: "카카오톡",
      icon: "/png/IconKaKaoTalk.png",
      onClick: handleKakaoShare,
      disabled: false,
    },
  ];

  // 구분선 아래의 세컨더리 액션
  const secondaryActions: BottomSheetAction[] = [
    {
      id: "save-image",
      label: "이미지 저장",
      icon: "/png/IconSave.png",
      onClick: handleSaveImage,
      disabled: false,
    },
  ];

  return (
    <div className="relative h-full w-full overflow-hidden transition-colors duration-500">
      {selectedThemeIndex === 1 && (
        <div className="absolute inset-0 flex items-center justify-center">
          <img
            src="/png/theme2.png"
            className="h-full w-full"
            alt="theme2-background"
          />
        </div>
      )}
      {selectedThemeIndex === 2 && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#FFFFFF]">
          <img
            src="/png/theme3.png"
            className="z-10 h-full w-full"
            alt="theme3-background"
          />
        </div>
      )}

      <div
        className={`relative z-10 flex h-full flex-col ${selectedThemeIndex === 1 ? "" : getThemeBackgroundClass(selectedThemeIndex)}`}
      >
        <div className="flex-1">
          <CarouselContainer
            slides={slides}
            fullWidthSlide={true}
            onSelectIndexChange={handleSlideIndexChange}
          />
        </div>
        <div className="m-10 flex h-[46px] flex-row items-center justify-center gap-x-[10px]">
          <button
            type="button"
            onClick={() => setIsBottomSheetOpen(true)}
            className="flex h-[46px] w-[161px] cursor-pointer items-center justify-center rounded-tr-xl rounded-bl-xl bg-[#373737] py-3 text-sm text-white"
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
                onKakaoLogin={handleKakaoLogin}
                onClose={() => setIsBottomSheetOpen(false)}
              />
            )}
          </BottomSheet>

          <button
            type="button"
            onClick={handleReanalyze}
            className="h-[46px] w-[161px] cursor-pointer rounded-tr-xl rounded-bl-xl bg-[#373737] py-3 text-sm text-white"
          >
            다시하기
          </button>
        </div>
      </div>
    </div>
  );
}
