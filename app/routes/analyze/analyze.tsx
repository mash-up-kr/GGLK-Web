import { zodResolver } from "@hookform/resolvers/zod";
import { useLayoutEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "~/shared/components/header";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import { intensities } from "~/shared/consts/intensity";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
import { cn } from "~/shared/utils/classname-utils";
import ImageStudioPage from "./image-studio";
import IntensitySelectPage from "./intensity-select";

const analyzeSchema = z.object({
  intensity: z.enum(["easy", "normal", "spicy"]),
  image: z.string().nonempty("이미지를 선택해주세요"),
});

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

export default function Analyze() {
  const methods = useForm<AnalyzeFormData>({
    resolver: zodResolver(analyzeSchema),
  });

  const { step, Funnel, onNext, onPrev } = useFunnelWithForm<AnalyzeFormData>({
    methods,
    onSubmit: (data) => {
      // 여기서 폼 데이터를 서버로 전송하거나 원하는 처리를 수행
      console.log("Form submitted:", data);
    },
    onStepChange: () => {
      console.log("step changed");
    },
  });

  const [bgColor, setBgColor] = useState<string | undefined>(undefined);

  // watch로 intensity 값을 실시간으로 감지
  const selectedIntensity = methods.watch("intensity");

  useLayoutEffect(() => {
    setBgColor(
      intensities.find((intensity) => intensity.value === selectedIntensity)
        ?.backgroundColor,
    );
  }, [selectedIntensity]);

  return (
    <>
      <div
        className={cn(
          "flex h-full flex-col transition-colors duration-700",
          step === 0 &&
            intensities.find(
              (intensity) => intensity.value === selectedIntensity,
            )?.backgroundColor,
        )}
      >
        <Header onPrevious={onPrev} />

        <FormProvider {...methods}>
          <Funnel className="grow">
            <IntensitySelectPage field="intensity" onNext={onNext} />
            <ImageStudioPage field="image" onNext={onNext} />
          </Funnel>
        </FormProvider>

        <PaperTextureLayer />
      </div>
    </>
  );
}
