import { type Path, useFormContext } from "react-hook-form";
import ImageSelectGuideModal from "~/shared/components/analyze/image-select-guide-modal";
import type { AnalyzeFormData } from "./analyze";

export default function ImageStudioPage({
  field,
  onNext,
}: {
  field: Path<AnalyzeFormData>;
  onNext: () => void;
}) {
  const { register } = useFormContext<AnalyzeFormData>();

  return (
    <div className="flex h-full flex-col items-center border">
      <div>이미지 수정</div>

      <input type="text" {...register(field)} className="border" />
      <ImageSelectGuideModal />

      <button type="button" onClick={onNext}>
        다음
      </button>
    </div>
  );
}
