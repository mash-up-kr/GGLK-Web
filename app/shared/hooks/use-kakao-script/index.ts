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
    };
  }
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

  return { authorize };
};
