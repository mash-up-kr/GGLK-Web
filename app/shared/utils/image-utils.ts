// HEIC 파일인지 확인하는 함수
export const isHeicFile = (file: File): boolean => {
  const fileName = file.name.toLowerCase();
  return (
    fileName.endsWith(".heic") ||
    fileName.endsWith(".heif") ||
    file.type === "image/heic" ||
    file.type === "image/heif"
  );
};

// HEIC 파일을 JPEG로 변환하는 함수
export const convertHeicToJpeg = async (file: File): Promise<File> => {
  try {
    // heic2any 라이브러리 동적 import
    const heic2any = (await import("heic2any")).default;

    console.log("HEIC 변환 시작:", file.name);

    const convertedBlob = (await heic2any({
      blob: file,
      toType: "image/jpeg",
      quality: 0.8,
    })) as Blob;

    console.log("HEIC 변환 완료");

    // 새 파일 객체 생성
    return new File([convertedBlob], file.name.replace(/\.heic$/i, ".jpg"), {
      type: "image/jpeg",
    });
  } catch (error) {
    console.error("HEIC conversion failed:", error);
    throw new Error("HEIC 파일 변환에 실패했습니다.");
  }
};
