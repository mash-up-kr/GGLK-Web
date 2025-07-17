import { useScript } from "@unhead/react";
import { env } from "~/env";

declare global {
  interface Window {
    /**
     * @see {@link https://developers.kakao.com/sdk/reference/js/release/index.html}
     */
    Kakao: {
      VERSION: string;
      isInitialized: () => boolean;
      cleanup: () => void;
      init: (appKey: string) => void;
      Auth: {
        authorize: (
          settings: Partial<{
            redirectUri: string;
            state: string;
            scope: string;
            prompt: string;
            loginHint: string;
            nonce: string;
            throughTalk: boolean;
          }>,
        ) => void;
      };
      Share: {
        sendDefault: (settings: KakaoShareSendDefaultSettings) => void;
      };
    };
  }

  // 피드 메시지용 기본 템플릿
  type DefaultFeedSettings = {
    // 메시지 템플릿 타입
    objectType: "feed";
    // 메시지 콘텐츠
    content: ContentObject;
    // 아이템 콘텐츠
    itemContent?: ItemContentObject;
    // 소셜 정보
    social?: SocialObject;
    // 버튼 문구
    buttonTitle?: string;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  // 리스트 메시지용 기본 템플릿
  type DefaultListSettings = {
    // 메시지 템플릿 타입
    objectType: "list";
    // 헤더 문구
    headerTitle: string;
    // 헤더 바로가기 정보
    headerLink: LinkObject;
    // 메시지 콘텐츠
    contents: ContentObject[];
    // 버튼 문구
    buttonTitle?: string;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  type DefaultLocationSettings = {
    // 메시지 템플릿 타입
    objectType: "location";
    // 메시지 콘텐츠
    content: ContentObject;
    // 주소
    address: string;
    // 장소 이름
    addressTitle?: string;
    // 소셜 정보
    social?: SocialObject;
    // 버튼 문구
    buttonTitle?: string;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  // 텍스트 메시지용 기본 템플릿
  type DefaultTextSettings = {
    // 메시지 템플릿 타입
    objectType: "text";
    // 텍스트
    text: string;
    // 바로가기 정보
    link: LinkObject;
    // 버튼 문구
    buttonTitle?: string;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  // 상품 정보
  type CommerceObject = {
    // 정가
    regularPrice: number;
    // 할인 가격
    discountPrice?: number;
    // 할인율
    discountRate?: number;
    // 정액 할인 가격, discountRate와 함께 사용 불가
    fixedDiscountPrice?: number;
    // 화폐 단위 (default: 원)
    currencyUnit?: string;
    // 화폐 단위 표시 위치 (0: 가격 뒤 | 1: 가격 앞, default: 0)
    currentUnitPosition?: number;
    // 상품 이름
    productName?: string;
  };

  // 커머스 메시지용 기본 템플릿
  type DefaultCommerceSettings = {
    // 메시지 템플릿 타입
    objectType: "commerce";
    // 메시지 콘텐츠
    content: ContentObject;
    // 상품 정보
    commerce: CommerceObject;
    // 버튼 문구
    buttonTitle?: string;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  // 캘린더 메시지용 기본 템플릿
  type DefaultCalendarSettings = {
    // 메시지 템플릿 타입
    objectType: "calendar";
    // ID 타입 (event: 공개 일정 | calendar: 구독 캘린더)
    idType: string;
    // 구독 캘린더 또는 공개 일정 ID
    id: string;
    // 일정 설명
    content: ContentObject;
    // 메시지 하단 버튼
    buttons?: ButtonObject[];
    // 카카오톡 미설치 시, 설치 페이지 이동 여부 (default: false)
    installTalk?: boolean;
    // 카카오톡 공유 전송 성공 알림에 포함할 키와 값
    serverCallbackArgs?: Record<string, string> | string;
  };

  type KakaoShareSendDefaultSettings =
    | DefaultFeedSettings
    | DefaultListSettings
    | DefaultLocationSettings
    | DefaultTextSettings
    | DefaultCommerceSettings
    | DefaultCalendarSettings;

  type ItemContentObject = {
    // 프로필 텍스트
    profileText?: string;
    // 프로필 이미지 URL
    profileImageUrl?: string;
    // 이미지 아이템 제목
    titleImageText?: string;
    // 이미지 아이템 이미지 URL
    titleImageUrl?: string;
    // 이미지 아이템 카테고리
    titleImageCategory?: string;
    // 아이템 정보 (최대: 5개)
    items?: ItemObject[];
    // 요약 정보
    sum?: string;
    // 합산 가격
    sumOp?: string;
  };

  type ItemObject = {
    // 아이템 이름
    item: string;
    // 아이템 가격
    itemOp: string;
  };

  type SocialObject = {
    // 좋아요 수
    likeCount?: number;
    // 댓글 수
    commentCount?: number;
    // 공유 수
    sharedCount?: number;
    // 조회 수
    viewCount?: number;
    // 구독 수
    subscriberCount?: number;
  };

  type ButtonObject = {
    // 버튼 문구
    title: string;
    // 바로가기 URL
    link: LinkObject;
  };

  type ContentObject = {
    // 제목
    title: string;
    // 이미지 URL
    imageUrl: string;
    // 바로가기 URL
    link: LinkObject;
    // 이미지 너비 (단위: Pixel)
    imageWidth?: number;
    // 이미지 높이 (단위: Pixel)
    imageHeight?: number;
    // 설명
    description?: string;
  };

  type LinkObject = {
    // 웹 URL
    webUrl?: string;
    // 모바일 웹 URL
    mobileWebUrl?: string;
    // Android 앱 실행 시 전달할 파라미터
    androidExecutionParams?: string;
    // iOS 앱 실행 시 전달할 파라미터
    iosExecutionParams?: string;
  };
}

export const useKakaoScript = () => {
  const { onLoaded } = useScript({
    src: "https://t1.kakaocdn.net/kakao_js_sdk/2.7.5/kakao.min.js",
    integrity:
      "sha384-dok87au0gKqJdxs7msEdBPNnKSRT+/mhTVzq+qOhcL464zXwvcrpjeWvyj1kCdq6",
    crossorigin: "anonymous",
  });

  onLoaded(() => {
    if (window.Kakao?.isInitialized?.()) return;

    window.Kakao.init(env.VITE_KAKAO_JAVASCRIPT_KEY);
  });

  const authorize = (
    settings?: Omit<
      Parameters<typeof window.Kakao.Auth.authorize>[0],
      "redirectUri"
    >,
  ) => {
    if (!window.Kakao?.isInitialized?.()) return;

    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.origin}/auth/kakao`,
      ...settings,
    });
  };

  const sendDefault = (settings: KakaoShareSendDefaultSettings) => {
    if (!window.Kakao?.isInitialized?.()) return;

    window.Kakao.Share.sendDefault(settings);
  };

  return { authorize, sendDefault };
};
