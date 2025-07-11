import { memo, useCallback, useMemo } from "react";
import { type Path, useFormContext } from "react-hook-form";

import SpeechBubble from "~/assets/analyze/speech-bubble.svg?react";
import CarouselContainer from "~/shared/components/carousel/carousel-container";
import SvgContainer from "~/shared/components/svg-container";
import { intensities } from "~/shared/consts/intensity";
import type { AnalyzeFormData } from "./analyze";
import IntensityItem from "./intensity/intensity-item";

// 예시 코드
function IntensitySelectPage({
  field,
  onNext,
}: {
  field: Path<AnalyzeFormData>;
  onNext: () => void;
}) {
  const { setValue, getValues } = useFormContext<AnalyzeFormData>();

  const handleSelectIndexChange = useCallback(
    (index: number) => {
      setValue(field, intensities[index].value);
    },
    [field, setValue],
  );

  // slides 배열 메모제이션
  const slides = useMemo(
    () =>
      intensities.map((intensity) => ({
        id: intensity.id,
        children: <IntensityItem intensity={intensity} />,
      })),
    [], // intensities는 상수이므로 의존성 배열이 비어있음
  );

  const startIndex = useMemo(
    () =>
      intensities.findIndex(
        (intensity) => intensity.value === getValues(field),
      ) ?? 0,
    [field, getValues],
  );

  return (
    <div className="flex h-full grow flex-col items-center">
      <div className="flex w-full grow flex-col">
        <CarouselContainer
          slides={slides}
          options={{
            loop: false,
            startIndex: startIndex,
          }}
          onSelectIndexChange={handleSelectIndexChange}
        />
      </div>

      <div className="flex w-full items-center justify-center gap-1.5 py-2.5 sm:py-3.5">
        <img
          width={60}
          src="/png/ai-face/speaking.png"
          alt="person-image-placeholder"
          className="-rotate-15"
        />
        <SvgContainer SvgComponent={SpeechBubble} onClick={onNext}>
          <div className="flex h-full w-full cursor-pointer items-center justify-center font-bold text-sm text-white">
            선택완료
          </div>
        </SvgContainer>
      </div>
    </div>
  );
}

IntensitySelectPage.displayName = "IntensitySelectPage";

export default memo(IntensitySelectPage);
