import { useControllableState } from "@radix-ui/react-use-controllable-state";
import { useCallback, useEffect, useRef, useState } from "react";
import Lottie from "react-lottie";
import { useNavigate, useSearchParams } from "react-router";
// @ts-ignore
import {
  useEvaluationControllerCheckIfGuestUserUseChance,
  useEvaluationControllerGetEvaluationById,
} from "~/api/endpoints/api";
import type { EvaluationItemResponseDto, Picture } from "~/api/model";
import Loading from "~/assets/loading.json";
import BottomSheet, {
  type BottomSheetAction,
  BOTTOM_SHEET_HEIGHT,
} from "~/shared/components/bottomSheet/bottom-sheet";
import type { CarouselSlide } from "~/shared/components/carousel";
import CarouselContainer from "~/shared/components/carousel/carousel-container";
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
    // 사용자 이미지가 없을 때만 기본 이미지 사용
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
  // const { isAuthenticated } = useAuthentication();
  const guestUsedCheck = useEvaluationControllerCheckIfGuestUserUseChance();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  // URL에서 evaluation ID를 가져옴
  const evaluationId = searchParams.get("id");

  // 실제 API 데이터 가져오기 (ID가 있을 때만 호출)
  const {
    data: evaluationData,
    isLoading,
    isError,
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
        await new Promise((resolve) => setTimeout(resolve, 300));
      }

      const slideArea = container.querySelector(".slide-area") as HTMLElement;
      if (!slideArea) {
        const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
        toast.error("이미지 저장 실패", {
          offset: { y: bottomSheetHeight + 4 },
        });
        return;
      }

      // 배경 이미지 요소들을 slide-area로 이동 (아니면 반영 안됨ㄴ)
      const backgroundImages = container.querySelectorAll('img[src*="theme"]');
      const addedBackgroundElements: HTMLElement[] = [];

      for (const bgImg of backgroundImages) {
        const imgElement = bgImg as HTMLImageElement;
        if (
          imgElement.src.includes("theme2.png") ||
          imgElement.src.includes("theme3.png")
        ) {
          // 배경 이미지를 slide-area의 첫 번째 자식으로 복사하여 추가
          const clonedBgImg = imgElement.cloneNode(true) as HTMLImageElement;
          clonedBgImg.style.position = "absolute";
          clonedBgImg.style.top = "0";
          clonedBgImg.style.left = "0";
          clonedBgImg.style.width = "100%";
          clonedBgImg.style.height = "100%";
          clonedBgImg.style.zIndex = "-1";
          slideArea.insertBefore(clonedBgImg, slideArea.firstChild);
          addedBackgroundElements.push(clonedBgImg);
        }
      }

      const allImages = slideArea.querySelectorAll("img");
      console.log(`총 ${allImages.length}개의 이미지 로딩 대기`);

      await Promise.all(
        Array.from(allImages).map((img, index) => {
          return new Promise<void>((resolve) => {
            const imgElement = img as HTMLImageElement;
            console.log(`이미지 ${index} 로딩중:`, imgElement.src);

            if (imgElement.complete && imgElement.naturalWidth > 0) {
              console.log(`이미지 ${index} 이미 로딩됨:`, imgElement.src);
              resolve();
            } else {
              imgElement.onload = () => {
                console.log(`이미지 ${index} 로딩 완료:`, imgElement.src);
                resolve();
              };
              imgElement.onerror = () => {
                console.warn(`이미지 ${index} 로딩 실패:`, imgElement.src);
                resolve();
              };
              setTimeout(() => {
                console.warn(`이미지 ${index} 타임아웃:`, imgElement.src);
                resolve();
              }, 10000);
            }
          });
        }),
      );

      if (document?.fonts?.ready) {
        await document.fonts.ready;

        await new Promise((resolve) => setTimeout(resolve, 1000));

        const checkFontsLoaded = () => {
          const fonts = [
            "NeoDunggeunmo",
            "Elice_Digital_Baeum",
            "AppleSDGothicNeo",
          ];
          return fonts.every((font) => document.fonts.check(`12px ${font}`));
        };

        let attempts = 0;
        while (!checkFontsLoaded() && attempts < 10) {
          await new Promise((resolve) => setTimeout(resolve, 200));
          attempts++;
        }
      }

      // 캐러셀 인덱스 버튼 - 캡쳐할 때 숨기도록
      const carouselButtons = slideArea.querySelectorAll(
        ".carousel-buttons, .carousel-container button",
      );
      const originalDisplay: string[] = [];
      let buttonIndex = 0;
      for (const button of carouselButtons) {
        const buttonElement = button as HTMLElement;
        originalDisplay[buttonIndex] = buttonElement.style.display;
        buttonElement.style.display = "none";
        buttonIndex++;
      }

      const exportDomAsPng = async (el: HTMLElement, fileName: string) => {
        // html-to-image
        const { toPng } = await import("html-to-image");

        let backgroundColor = "#ffffff"; // 기본 fallback
        switch (selectedThemeIndex) {
          case 0:
            backgroundColor = "#181818"; // 테마 1: 검은색
            break;
          case 1:
            backgroundColor = "#ffffff"; // 테마 2: 흰색
            break;
          case 2:
            backgroundColor = "#ffffff"; // 테마 3: 흰색
            break;
          default:
            backgroundColor = "#ffffff";
        }

        try {
          const dataUrl = await toPng(el, {
            quality: 1.0,
            width: el.offsetWidth,
            height: el.offsetHeight,
            backgroundColor: backgroundColor,
            style: {
              transform: "scale(1)",
              transformOrigin: "top left",
            },
            skipFonts: false,
            filter: (node) => {
              if (node instanceof HTMLImageElement) {
                return true;
              }
              return true;
            },
          });

          const link = document.createElement("a");
          const browserInfo = getBrowserInfo()
            .toLowerCase()
            .replace(/\s+/g, "-");
          link.download = `${fileName}-${browserInfo}-${Date.now()}.png`;
          link.href = dataUrl;
          link.click();
        } catch (error) {
          console.error("이미지 생성 실패:", error);
          throw error;
        }
      };

      // slide-area를 PNG로 저장
      await exportDomAsPng(slideArea, "ootd-result");

      // 추가된 배경 이미지 요소들 제거
      for (const bgImg of addedBackgroundElements) {
        bgImg.remove();
      }

      // 캐러셀 버튼들 복원
      let restoreIndex = 0;
      for (const button of carouselButtons) {
        const buttonElement = button as HTMLElement;
        if (originalDisplay[restoreIndex] !== undefined) {
          buttonElement.style.display = originalDisplay[restoreIndex];
        } else {
          buttonElement.style.display = "";
        }
        restoreIndex++;
      }

      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.success("이미지 저장 완료!", {
        offset: { y: bottomSheetHeight + 4 },
      });
    } catch (err) {
      console.error("이미지 저장 실패:", err);
      const bottomSheetHeight = BOTTOM_SHEET_HEIGHT();
      toast.error("이미지 저장 실패", { offset: { y: bottomSheetHeight + 4 } });
    }
  }, [getBrowserInfo, isBottomSheetOpen, selectedThemeIndex]);

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
    // if (isAuthenticated) {
    //   // 로그인된 사용자는 바로 홈으로 이동
    //   navigate("/");
    //   return;
    // }

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

  // evaluationId가 없는 경우 홈으로 리다이렉트
  useEffect(() => {
    if (!evaluationId) {
      navigate("/", { replace: true });
      toast.error("잘못된 접근입니다.");
    }
  }, [evaluationId, navigate]);

  // 조건부 반환문들을 모든 Hook 이후에 배치
  if (!evaluationId) {
    return (
      <div className="relative h-full w-full overflow-hidden transition-colors duration-500">
        <div
          className={`flex h-full items-center justify-center text-white ${getThemeBackgroundClass(0)}`}
        >
          잘못된 접근입니다.
        </div>
      </div>
    );
  }

  // 로딩 중
  if (isLoading) {
    return (
      <div className="relative h-full w-full overflow-hidden transition-colors duration-500">
        <div
          className={`flex h-full items-center justify-center text-white ${getThemeBackgroundClass(0)}`}
        >
          <Lottie
            width={80}
            height={80}
            options={{
              loop: true,
              autoplay: true,
              animationData: Loading,
            }}
          />
        </div>
      </div>
    );
  }

  // 에러 처리
  if (isError) {
    // 404 에러 (데이터를 찾을 수 없음)
    if (error.code === "404") {
      return (
        <div className="relative h-full w-full overflow-hidden transition-colors duration-500">
          <div
            className={`flex h-full items-center justify-center text-white ${getThemeBackgroundClass(0)}`}
          >
            데이터를 찾을 수 없습니다
          </div>
        </div>
      );
    }

    return (
      <div className="relative h-full w-full overflow-hidden transition-colors duration-500">
        <div
          className={`flex h-full items-center justify-center text-white ${getThemeBackgroundClass(0)}`}
        >
          데이터를 불러올 수 없습니다.
        </div>
      </div>
    );
  }

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
