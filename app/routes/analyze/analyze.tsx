import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import {
  evaluationControllerCheckIfGuestUserUseChance,
  useEvaluationControllerDoOotdRoasting,
} from "~/api/endpoints/api";
import BottomSheet, {
  BOTTOM_SHEET_HEIGHT,
} from "~/shared/components/bottomSheet/bottom-sheet";
import Header from "~/shared/components/header";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import { intensities } from "~/shared/consts/intensity";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
import { useKakaoScript } from "~/shared/hooks/use-kakao-script";
import { toast } from "~/shared/stores/toast-store";
import { cn } from "~/shared/utils/classname-utils";
import ReanalyzeContent from "../result/reanalyze-content";
import ImageStudioPage from "./image-studio";
import StickersBackground from "./image-studio/stickers-background";
import IntensitySelectPage from "./intensity-select";

const analyzeSchema = z.object({
  spicyLevel: z.number().min(1).max(3),
  imageId: z.number(),
});

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

export default function Analyze() {
  const navigate = useNavigate();
  const methods = useForm<AnalyzeFormData>({
    resolver: zodResolver(analyzeSchema),
  });
  const { authorize } = useKakaoScript();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);

  const {
    mutate: doOotdRoasting,
    isPending,
    isSuccess,
  } = useEvaluationControllerDoOotdRoasting({
    mutation: {
      onSuccess: ({ data }) => {
        if (data.id) {
          navigate(`/result?id=${data.id}`);
        }
        console.log("success", data);
      },
      onError: (error) => {
        console.error("OOTD roasting failed:", error);
        toast.error("다시 시도해주세요");
      },
    },
  });

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

  const { step, Funnel, onNext, onPrev } = useFunnelWithForm<AnalyzeFormData>({
    methods,
    onSubmit: async (data) => {
      // 여기서 폼 데이터를 서버로 전송하거나 원하는 처리를 수행
      try {
        const { data: hasUsedChance } =
          await evaluationControllerCheckIfGuestUserUseChance();

        if (hasUsedChance) {
          setIsBottomSheetOpen(true);
        } else {
          console.log("Form submitted:", data);
          doOotdRoasting({
            data: {
              imageId: data.imageId,
              spicyLevel: data.spicyLevel,
            },
          });
        }
      } catch (error) {
        console.error("게스트 사용 여부 확인 실패:", error);
        toast.error("다시 시도해주세요");
      }
    },
    onStepChange: () => {
      console.log("step changed");
    },
    defaultOnPrev: () => {
      navigate("/");
    },
  });

  // watch로 intensity 값을 실시간으로 감지
  const selectedIntensity = methods.watch("spicyLevel");

  const backgroundColor = useMemo(
    () =>
      intensities.find((intensity) => intensity.level === selectedIntensity)
        ?.colorClassName.background,
    [selectedIntensity],
  );

  return (
    <>
      <div
        className={cn(
          "flex h-full grow flex-col bg-grayscale text-black transition-colors duration-700",
          step === 0 && backgroundColor,
        )}
      >
        <Header
          onPrevious={onPrev}
          className={cn(step === 0 ? "text-white" : "")}
          isMenuIconHidden={step === 1}
        />

        {isPending || isSuccess ? (
          <div className="z-50 flex grow select-none flex-col items-center justify-center space-y-6.5 border-box p-4">
            <ResultContent />
          </div>
        ) : (
          <FormProvider {...methods}>
            <Funnel className="grow">
              <IntensitySelectPage field="spicyLevel" onNext={onNext} />
              <ImageStudioPage field="imageId" onNext={onNext} />
            </Funnel>
          </FormProvider>
        )}
        <PaperTextureLayer />
        <BottomSheet
          isOpen={isBottomSheetOpen}
          onClose={() => setIsBottomSheetOpen(false)}
        >
          <ReanalyzeContent
            onKakaoLogin={handleKakaoLogin}
            onClose={() => setIsBottomSheetOpen(false)}
          />
        </BottomSheet>
      </div>
    </>
  );
}

function ResultContent() {
  return (
    <>
      <img
        src="/png/ai-face/spicy.png"
        alt="ai-character"
        className="size-32.5 xs:size-38 animate-rotate-snap"
      />
      <p className="text-center font-bold font-sf text-lg">
        이제 곧 결과가 나올거야 <br /> 잠시만 기다리라구!
      </p>

      <StickersBackground
        firstStickerClassName="-translate-x-1/2 -rotate-30 top-1/3 left-0"
        secondStickerClassName="top-1/7 right-0 translate-x-1/2 rotate-30"
        thirdStickerClassName="translate-x-1/2 bottom-1/11 right-0 rotate-30"
      />
    </>
  );
}
