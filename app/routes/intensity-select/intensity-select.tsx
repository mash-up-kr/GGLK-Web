import { AnimatePresence, useCycle } from "motion/react";
import { Link } from "react-router";
import TypeWriter from "~/shared/components/typewriter";

// 예시 코드
export default function IntensitySelectPage() {
  const [currentText, toNextText] = useCycle(
    ...[
      "순한맛을 선택했군 좋은선택이야~",
      "보통맛을 선택했군!!!!!!!",
      "매운맛을 선택했군. 쉽지 않을 텐데?",
    ],
  );

  return (
    <div className="flex h-full flex-col items-center space-y-4 border">
      <div>강도 선택</div>
      <button
        className="rounded-2xl bg-gray-200 px-2 py-1"
        type="button"
        onClick={() => toNextText()}
      >
        클릭
      </button>
      <div className="h-10 w-full px-4">
        <AnimatePresence mode="wait">
          <TypeWriter key={currentText} text={currentText} />
        </AnimatePresence>
      </div>

      <Link to="/image-studio" className="rounded-2xl border px-2 py-1">
        Start Fashion of AI
      </Link>
    </div>
  );
}
