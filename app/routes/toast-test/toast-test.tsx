import { toast } from "~/shared/stores/toast-store";

/**
 * 테스트용 랜덤 한국어 안내 메시지 생성
 */
const MESSAGES = [
  "안녕하세요! 반갑습니다.",
  "잠시만 기다려주세요...",
  "성공적으로 완료되었습니다!",
  "오류가 발생했습니다. 다시 시도해주세요.",
  "정보를 확인해주세요.",
  "할 수 있어요! 힘내세요!",
  "처리 중입니다. 조금만 기다려주세요.",
  "훌륭해요! 작업이 완료됐어요.",
  "다음 단계로 진행하세요.",
  "이미 충분히 잘하고 있어요!",
  "로딩 중이에요. 잠깐만요!",
  "완료! 정말 잘하셨네요.",
  "설정을 변경하시겠어요?",
  "거의 다 왔어요! 조금만 더!",
  "데이터를 불러오고 있어요.",
];

/**
 * 랜덤 한국어 안내 메시지를 반환합니다.
 */
export function getRandomKoreanMessage(): string {
  return MESSAGES[Math.floor(Math.random() * MESSAGES.length)];
}

// 예시 코드
export default function ToastTestPage() {
  return (
    <div className="flex h-full flex-col items-center space-y-4 px-4 py-2">
      <h3 className="text-center font-bold text-xl">토스트 생성 테스트</h3>
      <button
        className="cursor-pointer rounded-full bg-green-700 px-5 py-1.5 font-medium text-white transition-colors hover:bg-green-800"
        type="button"
        onClick={() => {
          toast(getRandomKoreanMessage(), {
            offset: {
              y: 150,
            },
          });
        }}
      >
        토스트 만들기 🚀
      </button>
    </div>
  );
}
