import ImageSelectGuideModal from "~/shared/components/analyze/image-select-guide-modal";

export default function ImageStudioPage() {
  return (
    <div className="flex h-full flex-col items-center border">
      <div>이미지 수정</div>
      <ImageSelectGuideModal />
    </div>
  );
}
