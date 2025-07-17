import React, { useEffect, useState, type JSX } from "react";
import { cn } from "../utils/classname-utils";

// 한글 자소 단위 (초성, 중성, 종성)
const CHOSUNG = [
  "ㄱ",
  "ㄲ",
  "ㄴ",
  "ㄷ",
  "ㄸ",
  "ㄹ",
  "ㅁ",
  "ㅂ",
  "ㅃ",
  "ㅅ",
  "ㅆ",
  "ㅇ",
  "ㅈ",
  "ㅉ",
  "ㅊ",
  "ㅋ",
  "ㅌ",
  "ㅍ",
  "ㅎ",
];

/**
 * 한글 한 글자를 타이핑 과정 (자소 분리) 배열로 변환하는 함수
 * @param char - 한글 한 글자
 * @returns 타이핑 과정 배열 (e.g., '한' -> ['ㅎ', '하', '한'])
 */
const decompose = (char: string): string[] => {
  const ga = 44032; // '가'의 유니코드
  const code = char.charCodeAt(0);

  if (code < ga || code > 55203) {
    // 한글 음절 범위 밖일 경우
    return [char];
  }

  const unicode = code - ga;
  const choIndex = Math.floor(unicode / 588);
  const jungIndex = Math.floor((unicode % 588) / 28);
  const jongIndex = unicode % 28;

  const result = [];
  result.push(CHOSUNG[choIndex]);
  result.push(String.fromCharCode(ga + choIndex * 588 + jungIndex * 28));
  if (jongIndex > 0) {
    result.push(char);
  }
  return result;
};

interface TypingEffectProps {
  lines: (string | JSX.Element)[][];
  startDelay?: number;
  typingSpeed?: number;
  lineDelay?: number;
  className?: string;
  style?: React.CSSProperties;
  onComplete?: () => void;
}

type LineContent = (string | JSX.Element)[];

export const TypingEffect: React.FC<TypingEffectProps> = ({
  lines,
  startDelay = 1000,
  typingSpeed = 75,
  lineDelay = 500,
  className,
  style,
  onComplete,
}) => {
  const [displayedLines, setDisplayedLines] = useState<LineContent[]>([]);

  useEffect(() => {
    // 초기 라인 상태를 빈 배열로 설정
    setDisplayedLines(Array(lines.length).fill([]));

    const animate = async () => {
      await new Promise((res) => setTimeout(res, startDelay));

      for (let lineIndex = 0; lineIndex < lines.length; lineIndex++) {
        const currentLine = lines[lineIndex];
        let accumulatedLine: LineContent = [];

        for (const segment of currentLine) {
          if (typeof segment === "string") {
            for (const char of segment) {
              const decomposedChars = decompose(char);
              const baseText = accumulatedLine
                .filter((item) => typeof item === "string")
                .join("");

              for (let i = 0; i < decomposedChars.length; i++) {
                const nextChar = decomposedChars[i];
                const otherElements = accumulatedLine.filter(
                  (item) => typeof item !== "string",
                );

                setDisplayedLines((prev) => {
                  const newLines = [...prev];
                  newLines[lineIndex] = [baseText + nextChar, ...otherElements];
                  return newLines;
                });

                await new Promise((res) => setTimeout(res, typingSpeed));
              }
              accumulatedLine = [
                baseText + char,
                ...accumulatedLine.filter((item) => typeof item !== "string"),
              ];
            }
          } else {
            // JSX.Element (SVG 등)
            accumulatedLine.push(segment);

            setDisplayedLines((prev) => {
              const newLines = [...prev];
              newLines[lineIndex] = accumulatedLine;
              return newLines;
            });
          }
        }
        if (lineIndex < lines.length - 1) {
          await new Promise((res) => setTimeout(res, lineDelay));
        }
      }

      // 타이핑 완료 시 콜백 호출
      onComplete?.();
    };

    animate();
  }, [lines, startDelay, typingSpeed, lineDelay, onComplete]);

  return (
    <>
      {displayedLines.map((lineContent, lineIndex) => (
        <p
          key={`typing-line-${lineIndex}-${lineContent.length}`}
          className={cn("flex h-11 items-center gap-1", className)}
          style={style}
        >
          {Array.isArray(lineContent)
            ? lineContent.map((part, partIndex) => (
                <React.Fragment
                  key={`typing-part-${lineIndex}-${partIndex}-${typeof part === "string" ? part : "element"}`}
                >
                  {part}
                </React.Fragment>
              ))
            : lineContent}
        </p>
      ))}
    </>
  );
};
