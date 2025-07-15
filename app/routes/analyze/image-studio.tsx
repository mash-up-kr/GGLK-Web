import { useEffect, useRef, useState } from "react";
import { type Path, useFormContext } from "react-hook-form";
import { usePictureControllerUploadPicture } from "~/api/endpoints/api";
import { toast } from "~/shared/stores/toast-store";
import { convertHeicToJpeg, isHeicFile } from "~/shared/utils/image-utils";
import type { AnalyzeFormData } from "./analyze";
import InitialContent from "./image-studio/initial-contnet";
import PreviewContent from "./image-studio/preview-content";
import StickersBackground from "./image-studio/stickers-background";

export default function ImageStudioPage({
  field,
  onNext,
}: {
  field: Path<AnalyzeFormData>;
  onNext: () => void;
}) {
  const imageRef = useRef<HTMLInputElement>(null);
  const { setValue } = useFormContext<AnalyzeFormData>();
  const closeModalRef = useRef<HTMLButtonElement>(null);
  const [tempImageUrl, setTempImageUrl] = useState<string | null>(null);
  const [isConverting, setIsConverting] = useState(false);
  // const { isAuthenticated } = useAuthentication();

  const {
    mutate: uploadPicture,
    isPending,
    isError,
    data: pictureData,
  } = usePictureControllerUploadPicture();

  const handleImageUpload = async (imageFile: File | undefined) => {
    if (!imageFile) return;

    uploadPicture(
      {
        data: {
          image: imageFile,
        },
      },
      {
        onSuccess: ({ data: { id, url } }) => {
          if (id) {
            setValue(field, id);
          }
        },
        onError: (error) => {
          console.error(error);
          toast.error("이미지 업로드 실패");
        },
      },
    );
  };

  // unmount 시 이미지 메모리 해제
  useEffect(() => {
    return () => {
      if (tempImageUrl) {
        URL.revokeObjectURL(tempImageUrl);
      }
    };
  }, [tempImageUrl]);

  const handleLocalImageChange = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    let imageFile = e.target.files?.[0];
    if (!imageFile) return;
    if (closeModalRef.current) {
      closeModalRef.current.click();
    }
    if (isHeicFile(imageFile)) {
      try {
        setIsConverting(true);
        imageFile = await convertHeicToJpeg(imageFile);
      } catch (error) {
        toast.error("HEIC 변환 실패");
        return;
      } finally {
        setIsConverting(false);
      }
    }

    const tempImageUrl = URL.createObjectURL(imageFile as Blob);

    setTempImageUrl(tempImageUrl);

    await handleImageUpload(imageFile);
  };

  return (
    <div className="relative flex h-full grow flex-col">
      <StickersBackground />
      <input
        id="picture"
        type="file"
        className="hidden"
        accept="image/*"
        ref={imageRef}
        onChange={handleLocalImageChange}
      />
      <div className="z-50 flex grow select-none flex-col items-center justify-center space-y-4 border-box p-4">
        {tempImageUrl || isConverting ? (
          <PreviewContent
            isLoading={isPending}
            isConverting={isConverting}
            isError={isError}
            imageRef={imageRef}
            placeholderImageUrl={tempImageUrl}
            imgSrc={pictureData?.data?.url}
            onNext={onNext}
          />
        ) : (
          <InitialContent imageRef={imageRef} closeModalRef={closeModalRef} />
        )}
      </div>
    </div>
  );
}
