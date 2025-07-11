import ChatBubbleShape from "~/assets/analyze/chat-bubble-shape.svg?react";
import HeartShape from "~/assets/analyze/heart-shape.svg?react";
import StarShape from "~/assets/analyze/star-shape.svg?react";
import type { Intensity } from "../types/intensity";

export const intensities: Intensity[] = [
  {
    id: 1,
    value: "normal",
    level: 2,
    MainIcon: ChatBubbleShape,
    discription: "MZ사이에서 통하는 현실적인 하이브리드 공감형 평가 버전",
    backgroundColor: "bg-forest",
  },
  {
    id: 2,
    value: "spicy",
    level: 3,
    MainIcon: StarShape,
    discription: "깐깐한 패션 디렉터의 눈으로 골져스한 평가 버전",
    backgroundColor: "bg-lava",
  },
  {
    id: 3,
    value: "easy",
    level: 1,
    MainIcon: HeartShape,
    discription: "다정하고 칭찬을 아끼지 않는 패션 입문자를 위한 평가 버전",
    backgroundColor: "bg-ocean",
    aiFaceClassName: "pb-4",
  },
];
