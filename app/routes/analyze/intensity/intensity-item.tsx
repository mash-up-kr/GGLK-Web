import Asterisk from "~/assets/analyze/asterisk.svg?react";
import Badge from "~/assets/analyze/badge.svg?react";
import IntensityContainer from "~/assets/analyze/intensity-container.svg?react";
import SvgContainer from "~/shared/components/svg-container";
import type { Intensity } from "~/shared/types/intensity";
import { cn } from "~/shared/utils/classname-utils";

export default function IntensityItem({ intensity }: { intensity: Intensity }) {
  const {
    id,
    MainIcon,
    level,
    value,
    discription,
    aiFaceClassName,
    colorClassName,
    Highlight,
  } = intensity;

  return (
    <SvgContainer
      SvgComponent={IntensityContainer}
      className="h-full select-none"
      isKeepRatio
    >
      <div className="flex h-full flex-col items-center p-10 pb-13.5 font-elice">
        <div className="flex w-full items-start justify-between">
          <div className="relative w-fit font-bold text-xl xs:text-2xl">
            <div className={colorClassName.darkText}>No.{id}</div>
            <Highlight className="-top-1/3 -left-2/5 absolute h-[190%] w-[200%]" />
          </div>

          <IntensityBadge value={value} id={id} />
        </div>
        <div className="flex grow items-center justify-center">
          <SvgContainer SvgComponent={MainIcon}>
            <div className="relative flex h-full w-full items-center justify-center">
              <img
                src={`/png/ai-face/${value}.png`}
                alt="person-image-placeholder"
                className={cn("w-1/2 animate-rotate-snap", aiFaceClassName)}
              />
              <div
                className={cn(
                  "absolute font-nanum-brush text-[25px]",
                  intensity.labelClassName,
                )}
              >
                {value[0].toUpperCase() + value.slice(1)}
              </div>
              {intensity.asterisks.positions
                .filter((asterisk) => !asterisk.isOutside)
                .map((asterisk, index) => (
                  <Asterisk
                    key={index + value}
                    className={cn(
                      "absolute size-[35px] xs:size-[40px] animate-spin-slow",
                      intensity.asterisks.defaultColor,
                    )}
                    style={{
                      top: `${asterisk.top}%`,
                      left: `${asterisk.left}%`,
                    }}
                  />
                ))}
            </div>
          </SvgContainer>
        </div>
        <IntensityDescription description={discription} />
        {intensity.asterisks.positions
          .filter((asterisk) => asterisk.isOutside)
          .map((asterisk, index) => (
            <Asterisk
              key={index + value}
              className={cn(
                "absolute size-[35px] xs:size-[40px] animate-spin-slow",
                intensity.asterisks.defaultColor,
              )}
              style={{
                top: `${asterisk.top}%`,
                left: `${asterisk.left}%`,
              }}
            />
          ))}
      </div>
    </SvgContainer>
  );
}

function IntensityBadge({ value, id }: { value: string; id: number }) {
  return (
    <div className="flex flex-col items-center justify-center font-nanum-brush">
      <SvgContainer SvgComponent={Badge} className="h-6 xs:h-8">
        <div className="flex h-full w-full items-center justify-center text-sm xs:text-lg [@media(max-height:)]:text-sm">
          {value}
        </div>
      </SvgContainer>
      <SvgContainer SvgComponent={Badge} className="h-6 xs:h-8">
        <div className="flex h-full w-full items-center justify-center text-sm xs:text-lg [@media(max-height:)]:text-sm">
          Version 0{id}
        </div>
      </SvgContainer>
    </div>
  );
}

function IntensityDescription({ description }: { description: string }) {
  return (
    <div className="flex flex-col font-elice">
      <div className="text-sm opacity-70">예시</div>
      <div className="text-pretty break-keep font-bold text-base xs:text-xl [@media(max-height:650px)]:text-base">
        {description}
      </div>
    </div>
  );
}
