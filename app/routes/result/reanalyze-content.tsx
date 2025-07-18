interface ReanalyzeContentProps {
  onKakaoLogin: () => void;
  onClose: () => void;
}

export function ReanalyzeContent({
  onKakaoLogin,
  onClose,
}: ReanalyzeContentProps) {
  const handleKakaoLogin = async () => {
    try {
      await onKakaoLogin();
      onClose();
    } catch (error) {
      console.error("카카오톡 로그인 실패:", error);
    }
  };

  return (
    <>
      <div className="px-[16px] pb-[20px]">
        <h3 className="mb-2 text-start font-bold text-[18px] text-white">
          다시 분석하려면 로그인이 필요해요
        </h3>

        <p className="mb-6 text-start text-[#808080] text-[14px]">
          비회원은 분석 결과를 1회만 제공해드려요
        </p>

        <button
          type="button"
          onClick={handleKakaoLogin}
          className="flex w-full cursor-pointer flex-row items-center justify-center gap-x-3 rounded-lg bg-[#FEE500] px-4 py-3 font-medium"
        >
          <img
            src={"/png/IconKakaoLogo.png"}
            alt="kakao-icon"
            className="h-[20px] w-[20px]"
          />
          <span>카카오톡 로그인</span>
        </button>
      </div>
    </>
  );
}

export default ReanalyzeContent;
