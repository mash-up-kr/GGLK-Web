import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, type Path, useForm } from "react-hook-form";
import { z } from "zod";
import Header from "~/shared/components/header";
import useFunnelWithForm from "~/shared/hooks/use-funnel-with-form";
import ImageStudioPage from "./image-studio";
import IntensitySelectPage from "./intensity-select";

const analyzeSchema = z.object({
  intensity: z.enum(["easy", "normal", "spicy"]),
  image: z.string().nonempty("이미지를 선택해주세요"),
});

export type AnalyzeFormData = z.infer<typeof analyzeSchema>;

interface Step {
  name: "intensity-select" | "image-studio";
  validatePath: Path<AnalyzeFormData>[];
}

const steps: Step[] = [
  { name: "intensity-select", validatePath: ["intensity"] },
  { name: "image-studio", validatePath: ["intensity", "image"] },
];

export default function Analyze() {
  const methods = useForm<AnalyzeFormData>({
    resolver: zodResolver(analyzeSchema),
  });

  const { Funnel, onNext, onPrev } = useFunnelWithForm<Step, AnalyzeFormData>({
    defaultStep: steps[0],
    steps,
    methods,
    onSubmit: (data) => {
      // 여기서 폼 데이터를 서버로 전송하거나 원하는 처리를 수행
      console.log("Form submitted:", data);
    },
  });

  return (
    <div className="flex h-full flex-col">
      <Header onPrevious={onPrev} />
      <FormProvider {...methods}>
        <Funnel className="grow">
          <Funnel.Step name="intensity-select">
            <IntensitySelectPage onNext={onNext} />
          </Funnel.Step>
          <Funnel.Step name="image-studio">
            <ImageStudioPage onNext={onNext} />
          </Funnel.Step>
        </Funnel>
      </FormProvider>
    </div>
  );
}
