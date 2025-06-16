import type React from "react";
import { useEffect, useState } from "react";

interface ShareBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  imageUrl: string;
  shareUrl?: string;
  shareTitle?: string;
  shareText?: string;
}

function BottomSheet({
  isOpen,
  onClose,
  title,
}: // FIXME: 카카오톡 공유
// imageUrl,
// shareUrl = window.location.href,
// shareTitle = title,
// shareText = "",
ShareBottomSheetProps) {
  const [_, setIsVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
      const timer = setTimeout(() => setIsVisible(false), 300);
      return () => clearTimeout(timer);
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleGoHome = async () => {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/`);
      alert("홈 링크!");
    } catch (err) {
      alert("링크 복사 실패 ㅠ");
      console.error(err);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent | React.KeyboardEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="pointer-events-none fixed inset-0 z-50 flex items-end justify-center">
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            handleBackdropClick(e);
          }
        }}
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          isOpen ? "pointer-events-auto opacity-50" : "opacity-0"
        }`}
        onClick={handleBackdropClick}
      />
      {/* 시트 */}
      <div
        className={`relative w-[359px] max-w-md transform rounded-t-2xl bg-[#212121] py-[8px] shadow-2xl transition-transform duration-300 ${
          isOpen ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="mb-4 flex justify-center">
          <div className="h-1 w-12 rounded-full bg-[#636363]" />
        </div>
        <h3 className="mb-[20px] px-[16px] text-start font-bold text-[18px] text-white">
          {title}
        </h3>

        <div className="mb-[20px] flex justify-start gap-8 px-[16px]">
          <button
            type="button"
            onClick={handleGoHome}
            className="flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <img
              src="/public/png/iconShare.png"
              alt="home-link"
              className="h-12 w-12"
            />
            <span className="text-white text-xs">링크 복사</span>
          </button>
          <button
            type="button"
            onClick={() => console.log("카카오톡 공유 함수")}
            className="flex flex-col items-center gap-2 rounded-lg p-2 transition-colors hover:bg-gray-50"
          >
            <img
              src="/public/png/iconKaKaoTalk.png"
              alt="kakao"
              className="h-12 w-12"
            />
            <span className="text-white text-xs">카카오톡</span>
          </button>
        </div>
        <hr className="py-3 text-[#636363]" />
        <button
          type="button"
          onClick={() => console.log("이미지 저장 함수")}
          className="w-full rounded-lg px-[16px] text-start font-medium text-[#B9B9B9] transition-colors hover:bg-gray-500"
        >
          <div className="flex flex-row items-center gap-x-3">
            <img
              src="/public/png/iconSave.png"
              alt="kakao"
              className="h-12 w-12"
            />
            <span>이미지 저장</span>
          </div>
        </button>
      </div>
    </div>
  );
}

export default BottomSheet;
