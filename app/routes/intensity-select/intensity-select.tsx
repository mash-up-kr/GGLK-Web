import { AnimatePresence } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";
import TypeWriter from "~/shared/components/typewriter";

// 예시 코드
export default function IntensitySelectPage() {
  const [idx, setIdx] = useState(0);
  const textArr = [
    "순한맛을 선택했군 좋은선택이야~",
    "보통맛을 선택했군!!!!!!!",
    "매운맛을 선택했군. 쉽지 않을 텐데?",
  ];

  return (
    <div className="flex h-full flex-col items-center space-y-4 border">
      <div>강도 선택 {idx}</div>
      <button
        className="rounded-2xl bg-gray-200 px-2 py-1"
        type="button"
        onClick={() => setIdx((prev) => (prev + 1) % 3)}
      >
        클릭
      </button>
      <div className="h-10 w-full px-4">
        <AnimatePresence mode="wait">
          <TypeWriter key={textArr[idx]} text={textArr[idx]} />
        </AnimatePresence>
      </div>

      <Link to="/image-studio" className="rounded-2xl border px-2 py-1">
        Start Fashion of AI
      </Link>
    </div>
  );
}
