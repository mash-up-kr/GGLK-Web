import { useFormContext } from "react-hook-form";
import ImageSelectGuideModal from "~/shared/components/analyze/image-select-guide-modal";

export default function ImageStudioPage({
  onNext,
}: {
  onNext: () => void;
}) {
  const { register } = useFormContext();

  return (
    <div className="flex h-full flex-col items-center border">
      <div>이미지 수정</div>

      <input type="text" {...register("image")} className="border" />
      <ImageSelectGuideModal />

      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
}
