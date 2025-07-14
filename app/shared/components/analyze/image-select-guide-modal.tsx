import Modal from "../modal";

interface ImageSelectGuideModalProps {
  triggerComponent: React.ReactNode;
}

export default function ImageSelectGuideModal({
  triggerComponent,
}: ImageSelectGuideModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger>{triggerComponent}</Modal.Trigger>
      <Modal.Content>
        <div className="flex h-[519px] w-[335px] flex-col">
          <div className="p-4">
            <h2 className="font-bold text-xl">모달 제목</h2>
            <p className="mt-2">모달 내용을 여기에 작성하세요.</p>
          </div>
          <Modal.Close>닫기</Modal.Close>
        </div>
      </Modal.Content>
    </Modal.Root>
  );
}
