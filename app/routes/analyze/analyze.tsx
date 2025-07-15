import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "~/shared/components/header";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import { intensities } from "~/shared/consts/intensity";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
import { cn } from "~/shared/utils/classname-utils";
import ImageStudioPage from "./image-studio";
import IntensitySelectPage from "./intensity-select";

const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
];

const analyzeSchema = z.object({
  intensity: z.enum(["easy", "normal", "spicy"]),
  image: z
    .any()
    .refine((files) => files && files.length > 0, "이미지를 선택해주세요.")
    .refine(
      (files) => files && ACCEPTED_IMAGE_TYPES.includes(files[0]?.type),
      "Only .jpg, .jpeg, .png, .heic, .heif and .webp formats are supported.",
    ),
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

  // watch로 intensity 값을 실시간으로 감지
  const selectedIntensity = methods.watch("intensity");

  const backgroundColor = useMemo(
    () =>
      intensities.find((intensity) => intensity.value === selectedIntensity)
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
