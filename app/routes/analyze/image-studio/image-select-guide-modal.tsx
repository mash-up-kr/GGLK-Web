import IntensityContainer from "~/assets/analyze/intensity-container.svg?react";
import ExclamationMark from "~/assets/image-studio/exclamation-mark.svg?react";
import ModalIcon1 from "~/assets/image-studio/modal-icon-1.svg?react";
import ModalIcon2 from "~/assets/image-studio/modal-icon-2.svg?react";
import ModalIcon3 from "~/assets/image-studio/modal-icon-3.svg?react";
import Underline from "~/assets/image-studio/underline.svg?react";
import Modal from "../../../shared/components/modal";
import SvgContainer from "../../../shared/components/svg-container";

const guideTexts = [
  {
    Icon: ModalIcon1,
    description: "이미지를 올리기 전에 꼭 확인해",
  },
  {
    Icon: ModalIcon2,
    description: "전신샷일수록 더 잘 분석해줄꺼야",
  },
  {
    Icon: ModalIcon3,
    description: "아무것도 없는 사진은 분석할 수 없어",
  },
];

interface ImageSelectGuideModalProps {
  triggerComponent: React.ReactNode;
  onStart: () => Promise<void> | void;
  closeModalRef: React.RefObject<HTMLButtonElement | null>;
}

export default function ImageSelectGuideModal({
  triggerComponent,
  onStart,
  closeModalRef,
}: ImageSelectGuideModalProps) {
  return (
    <Modal.Root>
      <Modal.Trigger asChild>{triggerComponent}</Modal.Trigger>
      <Modal.Content className="flex w-[326px] items-center justify-center bg-transparent">
        <SvgContainer
          SvgComponent={IntensityContainer}
          className="xs:w-full select-none"
          isKeepRatio
        >
          <div className="flex h-full flex-col items-center justify-between break-keep px-8 py-14 font-sf">
            <div className="flex flex-col items-center font-bold text-lg xs:text-xl ">
              <div className="flex items-center space-x-2">
                <ExclamationMark className="size-4 xs:size-5" />
                <div>잠시</div>
                <ExclamationMark className="size-4 xs:size-5" />
              </div>
              <div className="text-center">이미지를 올리기 전에 꼭 확인해</div>
            </div>
            <div className="flex flex-col space-y-5 font-bold text-sm">
              {guideTexts.map(({ Icon, description }) => (
                <div
                  key={description}
                  className="flex items-center space-x-3.5"
                >
                  <Icon className="size-12 xs:size-14" />
                  <p>{description}</p>
                </div>
              ))}
            </div>

            <button type="button" onClick={onStart} className="cursor-pointer">
              <div className="font-bold text-base xs:text-lg">
                진짜 시작하기
              </div>
              <Underline />
            </button>

            <Modal.Close ref={closeModalRef} />
          </div>
        </SvgContainer>
      </Modal.Content>
    </Modal.Root>
  );
}
