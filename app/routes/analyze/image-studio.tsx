import { useEffect, useRef, useState } from "react";
import { type Path, useFormContext } from "react-hook-form";
import { usePictureControllerUploadPicture } from "~/api/endpoints/api";
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
  // const { isAuthenticated } = useAuthentication();

  const {
    mutate: uploadPicture,
    isPending,
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
    const imageFile = e.target.files?.[0];
    const tempImageUrl = URL.createObjectURL(imageFile as Blob);

    setTempImageUrl(tempImageUrl);
    if (closeModalRef.current) {
      closeModalRef.current.click();
    }
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
        {tempImageUrl ? (
          <PreviewContent
            isLoading={isPending}
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
