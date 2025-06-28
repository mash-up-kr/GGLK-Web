import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "~/shared/components/header";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
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

  const { Funnel, onNext, onPrev } = useFunnelWithForm<AnalyzeFormData>({
    methods,
    onSubmit: (data) => {
      // 여기서 폼 데이터를 서버로 전송하거나 원하는 처리를 수행
      console.log("Form submitted:", data);
    },
    onStepChange: () => {
      console.log("step changed");
    },
  });

  return (
    <div className="relative flex h-full flex-col bg-forest">
      <PaperTextureLayer />
      <Header onPrevious={onPrev} />
      <FormProvider {...methods}>
        <Funnel className="grow">
          <IntensitySelectPage field="intensity" onNext={onNext} />
          <ImageStudioPage field="image" onNext={onNext} />
        </Funnel>
      </FormProvider>
    </div>
  );
}
