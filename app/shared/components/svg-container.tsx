import type { ComponentProps } from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "../utils/classname-utils";

type SvgComponentType = React.FunctionComponent<
  React.SVGProps<SVGSVGElement> & {
    title?: string;
    titleId?: string;
    desc?: string;
    descId?: string;
  }
>;

interface SvgContainerProps {
  SvgComponent: SvgComponentType;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  isKeepRatio?: boolean;
}

// SVG의 비율을 계산하는 유틸리티 함수들
function getSvgRatio(svgElement: SVGSVGElement): number {
  // 1. viewBox에서 비율 추출 시도
  const viewBox = svgElement.getAttribute("viewBox");
  if (viewBox) {
    const parts = viewBox.split(/\s+/);
    if (parts.length >= 4) {
      const width = Number.parseFloat(parts[2]);
      const height = Number.parseFloat(parts[3]);
      if (width > 0 && height > 0) {
        return width / height;
      }
    }
  }

  // 2. width/height 속성에서 추출 시도
  const width = svgElement.getAttribute("width");
  const height = svgElement.getAttribute("height");
  if (width && height) {
    const w = Number.parseFloat(width);
    const h = Number.parseFloat(height);
    if (w > 0 && h > 0) {
      return w / h;
    }
  }

  // 3. 실제 렌더링된 크기에서 계산
  const rect = svgElement.getBoundingClientRect();
  if (rect.width > 0 && rect.height > 0) {
    return rect.width / rect.height;
  }

  return 1; // 기본값
}

export default function SvgContainer({
  SvgComponent,
  children,
  className,
  onClick,
  isKeepRatio = false,
  ...props
}: SvgContainerProps & ComponentProps<SvgComponentType>) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [ratio, setRatio] = useState<number | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const svgElement = containerRef.current.querySelector("svg");
      if (svgElement) {
        const calculatedRatio = getSvgRatio(svgElement);
        setRatio(calculatedRatio);
      }
    }
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn("relative flex items-center justify-center", className)}
    >
      <SvgComponent
        className={cn("h-full w-full", onClick && "cursor-pointer")}
        onClick={onClick}
        {...props}
      />
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center",
          onClick && "pointer-events-none",
        )}
      >
        {isKeepRatio ? (
          <div
            style={{
              aspectRatio: ratio ?? 1,
            }}
            className="relative"
          >
            {children}
          </div>
        ) : (
          children
        )}
      </div>
    </div>
  );
}
// 별도로 사용할 수 있는 유틸리티 함수 export
export { getSvgRatio };
