/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL: string;
  readonly VITE_KAKAO_JAVASCRIPT_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
