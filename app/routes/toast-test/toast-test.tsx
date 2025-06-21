import { toast } from "~/shared/stores/toast-store";

// 예시 코드
export default function ToastTestPage() {
  return (
    <div className="flex h-full flex-col items-center space-y-4 px-4 py-2">
      <h3 className="text-center font-bold text-xl">토스트 생성 테스트</h3>
      <button
        className="cursor-pointer rounded-full bg-green-700 px-5 py-1.5 font-medium text-white transition-colors hover:bg-green-800"
        type="button"
        onClick={() => {
          toast("안녕하세요! 예시 토스트입니다");
        }}
      >
        토스트 만들기 🚀
      </button>
    </div>
  );
}
