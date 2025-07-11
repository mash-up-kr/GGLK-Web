import { useFormContext } from "react-hook-form";
import Badge from "~/assets/analyze/badge.svg?react";
import IntensityContainer from "~/assets/analyze/intensity-container.svg?react";
import SvgContainer from "~/shared/components/svg-container";
import type { Intensity } from "~/shared/types/intensity";
import { cn } from "~/shared/utils/classname-utils";
import type { AnalyzeFormData } from "../analyze";

export default function IntensityItem({ intensity }: { intensity: Intensity }) {
  const { MainIcon, level, value, discription, aiFaceClassName } = intensity;
  const { watch } = useFormContext<AnalyzeFormData>();

  return (
    <SvgContainer
      SvgComponent={IntensityContainer}
      className="h-full select-none"
    >
      <div className="flex h-full flex-col items-center p-13.5 xs:p-10 pb-16 xs:pb-13.5 font-elice">
        <div className="flex w-full justify-between">
          <div className="font-bold text-xl xs:text-2xl [@media(max-height:600px)]:text-xl">
            No.{level}
          </div>
          <IntensityBadge value={value} level={level} />
        </div>
        <div className="flex grow items-center justify-center">
          <SvgContainer SvgComponent={MainIcon}>
            <div className="flex h-full w-full items-center justify-center">
              <img
                src={`/png/ai-face/${value}.png`}
                alt="person-image-placeholder"
                className={cn(
                  "w-28 xs:w-33 animate-rotate-snap",
                  aiFaceClassName,
                )}
              />
            </div>
          </SvgContainer>
        </div>
        <IntensityDescription description={discription} />
      </div>
    </SvgContainer>
  );
}

function IntensityBadge({ value, level }: { value: string; level: number }) {
  return (
    <div className="flex flex-col items-center justify-center font-nanum-brush">
      <SvgContainer
        SvgComponent={Badge}
        className="h-6 xs:h-8 [@media(max-height:600px)]:h-6"
      >
        <div className="flex h-full w-full items-center justify-center text-sm xs:text-lg [@media(max-height:600px)]:text-sm">
          {value}
        </div>
      </SvgContainer>
      <SvgContainer
        SvgComponent={Badge}
        className="h-6 xs:h-8 [@media(max-height:600px)]:h-6"
      >
        <div className="flex h-full w-full items-center justify-center text-sm xs:text-lg [@media(max-height:600px)]:text-sm">
          Version 0{level}
        </div>
      </SvgContainer>
    </div>
  );
}

function IntensityDescription({ description }: { description: string }) {
  return (
    <div className="flex flex-col font-elice">
      <div className="text-sm opacity-70">예시</div>
      <div className="text-pretty break-keep font-bold text-base xs:text-xl [@media(max-height:600px)]:text-base">
        {description}
      </div>
    </div>
  );
}
