import ChatBubbleShape from "~/assets/analyze/chat-bubble-shape.svg?react";
import HeartShape from "~/assets/analyze/heart-shape.svg?react";
import Highlight1 from "~/assets/analyze/highlight1.svg?react";
import Highlight2 from "~/assets/analyze/highlight2.svg?react";
import Highlight3 from "~/assets/analyze/highlight3.svg?react";
import StarShape from "~/assets/analyze/star-shape.svg?react";
import type { Intensity } from "../types/intensity";

export const intensities: Intensity[] = [
  {
    id: 1,
    value: "normal",
    level: 1,
    MainIcon: ChatBubbleShape,
    discription: "MZ사이에서 통하는 현실적인 하이브리드 공감형 평가 버전",
    colorClassName: {
      text: "text-forest",
      darkText: "text-forest-dark",
      background: "bg-forest",
    },
    Highlight: Highlight1,
    asterisks: {
      defaultColor: "text-forest",
      positions: [
        {
          top: 2,
          left: 70,
        },
        {
          isOutside: true,
          top: 69,
          left: -1,
        },
      ],
    },
    labelClassName: "left-5 -bottom-2.5 rotate-5",
  },
  {
    id: 2,
    value: "spicy",
    level: 2,
    MainIcon: StarShape,
    discription: "깐깐한 패션 디렉터의 눈으로 골져스한 평가 버전",
    colorClassName: {
      text: "text-lava",
      darkText: "text-lava-dark",
      background: "bg-lava",
    },
    Highlight: Highlight2,
    asterisks: {
      defaultColor: "text-lava",
      positions: [
        {
          top: 2,
          left: 70,
        },
        {
          isOutside: true,
          top: 69,
          left: -1,
        },
      ],
    },
    labelClassName: "left-10 -bottom-6 rotate-17",
  },
  {
    id: 3,
    value: "easy",
    level: 0,
    MainIcon: HeartShape,
    discription: "다정하고 칭찬을 아끼지 않는 패션 입문자를 위한 평가 버전",
    colorClassName: {
      text: "text-ocean",
      darkText: "text-ocean-dark",
      background: "bg-ocean",
    },
    Highlight: Highlight3,
    aiFaceClassName: "pb-4",
    asterisks: {
      defaultColor: "text-ocean",
      positions: [
        {
          top: 0,
          left: 4,
        },
        {
          top: 0,
          left: 78,
        },
      ],
    },
    labelClassName: "left-14 -bottom-4 rotate-41",
  },
];
