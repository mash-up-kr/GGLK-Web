import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCallback, useRef, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import {
  useEvaluationControllerCheckIfGuestUserUseChance,
  useEvaluationControllerGetEvaluationById,
} from "~/api/endpoints/api";
import type { EvaluationItemResponseDto, Picture } from "~/api/model";
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

// API 데이터가 없을 때 사용할  mock data
const mockEvaluationData: EvaluationItemResponseDto = {
  id: 1,
  title: "너무 과하지도 않고, 너무 밋밋하지도 않게, 정말 인상적이야!",
  nickname: "자연주의 패셔니스타",
  hashtagList: [
    "#개성마핑크패션",
    "#승강기보다넓은바지통",
    "#그레이딩자켓고무장화",
    "#패션자신감인정",
  ],
  totalScore: 85,
  picture: {
    url: "/png/1.png",
    alt: "스타일 이미지",
  },
};

const createThemeSlides = (
  evaluationData?: EvaluationItemResponseDto,
): CarouselSlide[] => {
  const roastedResult = evaluationData || mockEvaluationData;

  // API 데이터에서 이미지 URL을 가져오거나 기본값 사용
  const getImageUrl = (index: number) => {
    if (
      roastedResult?.picture &&
      typeof roastedResult.picture === "object" &&
      "url" in roastedResult.picture
    ) {
      const picture = roastedResult.picture as Picture;
      const url = picture.url;
      if (typeof url === "string") {
        return url;
      }
    }
    // FIXME: 기본 이미지들 (API 데이터가 없을 때 사용)
    const defaultImages = ["/png/1.png", "/png/2.png", "/png/3.png"];
    return defaultImages[index] || "/png/1.png";
  };

  const getImageAlt = () => {
    if (
      roastedResult?.picture &&
      typeof roastedResult.picture === "object" &&
      "alt" in roastedResult.picture
    ) {
      const picture = roastedResult.picture as Picture;
      const alt = picture.alt;
      if (typeof alt === "string") {
        return alt;
      }
    }
    return "theme-image";
  };

  return [
    {
      id: 0,
      image: getImageUrl(0),
      alt: getImageAlt(),
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme1
          slides={slides}
          slideIndex={slideIndex}
          evaluationData={roastedResult}
        />
      ),
    },
    {
      id: 1,
      image: getImageUrl(1),
      alt: getImageAlt(),
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme2
          slides={slides}
          slideIndex={slideIndex}
          evaluationData={roastedResult}
        />
      ),
    },
    {
      id: 2,
      image: getImageUrl(2),
      alt: getImageAlt(),
      themeComponent: (slides: CarouselSlide[], slideIndex: number) => (
        <Theme3
          slides={slides}
          slideIndex={slideIndex}
          evaluationData={roastedResult}
        />
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
  const [searchParams] = useSearchParams();
  const { authorize, sendDefault } = useKakaoScript();
  const { isAuthenticated } = useAuthentication();
  const guestUsedCheck = useEvaluationControllerCheckIfGuestUserUseChance();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // URL에서 evaluation ID를 가져옴
  const evaluationId = searchParams.get("id");

  // 실제 API 데이터 가져오기 (ID가 있을 때만 호출)
  const {
    data: evaluationData,
    isLoading,
    error,
  } = useEvaluationControllerGetEvaluationById(
    evaluationId ? Number.parseInt(evaluationId) : 0,
    {
      query: {
        enabled: !!evaluationId,
      },
    },
  );

  const [contentType, setContentType] = useState<"share" | "reanalyze">(
    "share",
  );
  const slides = createThemeSlides(evaluationData?.data);

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

  if (isLoading) {
    return <div>로딩중</div>;
  }

  if (error && evaluationId) {
    return <div>데이터를 불러올 수 없습니다.</div>;
  }

  // 브라우저 정보 감지
  const getBrowserInfo = useCallback(() => {
    const userAgent = navigator.userAgent;
    if (userAgent.includes("CriOS")) {
      return "Chrome (iOS)";
    }
    if (userAgent.includes("Chrome")) {
      return "Chrome";
    }
    if (userAgent.includes("Safari")) {
      return "Safari";
    }
    return "Unknown";
  }, []);

  // 이미지 추출 및 저장 로직
  const handleSaveImage = useCallback(async () => {
    try {
      const container = containerRef.current;
      if (!container) {
        const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
        toast.error("이미지 저장 실패", {
          offset: { y: bottomSheetHeight + 4 },
        });
        return;
      }

      // 바텀시트가 열려있으면 닫기
      if (isBottomSheetOpen) {
        setIsBottomSheetOpen(false);
        // 바텀시트가 완전히 닫힐 때까지 잠시 대기
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      // 캡처할 영역 계산 (전체 컨테이너를 캡처하되 슬라이드 영역만 잘라내기)
      const slideContainer = container.querySelector(
        '[class*="h-full overflow-hidden"]',
      ) as HTMLElement | null;

      if (!slideContainer) {
        const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
        toast.error("이미지 저장 실패", {
          offset: { y: bottomSheetHeight + 4 },
        });
        return;
      }

      const html2canvas = (await import("html2canvas")).default;

      // 전체 컨테이너를 캡처 (테마 배경 이미지 포함)
      const fullCanvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: null,
        scrollY: -window.scrollY,
      });

      // 슬라이드 영역만 잘라내기
      const slideTop = slideContainer.offsetTop;
      const slideHeight = slideContainer.offsetHeight;
      const containerWidth = container.offsetWidth;

      const cropCanvas = document.createElement("canvas");
      const finalWidth = 375; // 375 * 2 (scale 2 적용)
      const finalHeight = 670; // 670 * 2 (scale 2 적용)

      cropCanvas.width = finalWidth;
      cropCanvas.height = finalHeight;

      const ctx = cropCanvas.getContext("2d");
      if (!ctx) {
        const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
        toast.error("이미지 저장 실패", {
          offset: { y: bottomSheetHeight + 4 },
        });
        return;
      }

      // 전체 캔버스에서 슬라이드 영역만 잘라내기 (375×670 크기로 고정)
      ctx.drawImage(
        fullCanvas,
        0,
        slideTop * 2,
        containerWidth * 2,
        slideHeight * 2, // src (잘라낼 영역)
        0,
        0,
        finalWidth,
        finalHeight, // dest (375×670 크기로 고정)
      );

      // 이미지 다운로드
      const link = document.createElement("a");
      const browserInfo = getBrowserInfo().toLowerCase().replace(/\s+/g, "-");
      link.download = `ootd-result-${browserInfo}-${Date.now()}.png`;
      link.href = cropCanvas.toDataURL("image/png");
      link.click();

      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.success("이미지 저장 완료!", {
        offset: { y: bottomSheetHeight + 4 },
      });
    } catch (err) {
      console.error("이미지 저장 실패:", err);
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.error("이미지 저장 실패", { offset: { y: bottomSheetHeight + 4 } });
    }
  }, [getBrowserInfo, isBottomSheetOpen]);

  const handleCopyLink = async () => {
    try {
      const homeUrl = `${window.location.origin}/`; // 홈 URL
      await navigator.clipboard.writeText(homeUrl);
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.success("링크 복사 완료!", {
        offset: { y: bottomSheetHeight + 4 },
      });
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
    <div
      className="relative h-full w-full overflow-hidden transition-colors duration-500"
      ref={containerRef}
    >
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
        <div className="button-section m-10 flex h-[46px] flex-row items-center justify-center gap-x-[10px]">
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
