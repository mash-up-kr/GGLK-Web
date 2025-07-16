import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { z } from "zod";
import { useEvaluationControllerDoOotdRoasting } from "~/api/endpoints/api";
import Header from "~/shared/components/header";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import { intensities } from "~/shared/consts/intensity";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
import { cn } from "~/shared/utils/classname-utils";
import ImageStudioPage from "./image-studio";
import StickersBackground from "./image-studio/stickers-background";
import IntensitySelectPage from "./intensity-select";

const analyzeSchema = z.object({
  spicyLevel: z.number(),
  imageId: z.number(),
});

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

export default function Analyze() {
  const navigate = useNavigate();
  const methods = useForm<AnalyzeFormData>({
    resolver: zodResolver(analyzeSchema),
  });

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
    },
  });

  const { step, Funnel, onNext, onPrev } = useFunnelWithForm<AnalyzeFormData>({
    methods,
    onSubmit: (data) => {
      // 여기서 폼 데이터를 서버로 전송하거나 원하는 처리를 수행
      console.log("Form submitted:", data);
      doOotdRoasting({
        data: {
          imageId: data.imageId,
          spicyLevel: data.spicyLevel,
        },
      });
    },
    onStepChange: () => {
      console.log("step changed");
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
