import { AnimatePresence } from "motion/react";
import { useFormContext } from "react-hook-form";
import TypeWriter from "~/shared/components/typewriter";
import type { AnalyzeFormData } from "./analyze";

interface Intensity {
  value: "easy" | "normal" | "spicy";
  label: string;
  discription: string;
}

// 예시 코드
export default function IntensitySelectPage({
  onNext,
}: { onNext: () => void }) {
  const { register, watch } = useFormContext<AnalyzeFormData>();
  const selectedIntensity = watch("intensity");

  const intensities: Intensity[] = [
    {
      value: "easy",
      label: "순한맛",
      discription: "순한맛을 선택했군 좋은선택이야~",
    },
    {
      value: "normal",
      label: "보통맛",
      discription: "보통맛을 선택했군 좋은선택이야~",
    },
    {
      value: "spicy",
      label: "매운맛",
      discription: "매운맛을 선택했군. 쉽지 않을 텐데?",
    },
  ];

  const crtIntensityInfo = intensities.find(
    (intensity) => intensity.value === selectedIntensity,
  );

  return (
    <div className="flex h-full flex-col items-center space-y-4 border">
      <fieldset className="w-full">
        <legend>강도 선택</legend>

        <div className="h-10 w-full px-4">
          <AnimatePresence mode="wait">
            {crtIntensityInfo && (
              <TypeWriter
                key={crtIntensityInfo?.value}
                text={crtIntensityInfo.discription}
              />
            )}
          </AnimatePresence>
        </div>

        {intensities.map((intensity) => (
          <div key={intensity.value}>
            <input
              type="radio"
              id={intensity.label}
              value={intensity.value}
              checked={selectedIntensity === intensity.value}
              {...register("intensity")}
            />
            <label htmlFor={intensity.label}>{intensity.label}</label>
          </div>
        ))}

        <button type="button" onClick={onNext}>
          다음으로
        </button>
      </fieldset>
    </div>
  );
}
