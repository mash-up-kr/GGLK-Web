import SpeechBubble from "~/assets/analyze/speech-bubble.svg?react";
import SvgContainer from "../svg-container";

interface SpeechBubbleButtonProps {
  onClick: () => void;
  label: string;
}

export default function SpeechBubbleButton({
  onClick,
  label,
}: SpeechBubbleButtonProps) {
  return (
    <SvgContainer SvgComponent={SpeechBubble} onClick={onClick}>
      <div className="flex h-full w-full cursor-pointer items-center justify-center font-bold text-sm text-white">
        {label}
      </div>
    </SvgContainer>
  );
}
