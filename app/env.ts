import { createEnv } from "@t3-oss/env-core";
import { z } from "zod";

export const env = createEnv({
  clientPrefix: "VITE_",
  client: {
    VITE_API_URL: z.string().url(),
    VITE_KAKAO_JAVASCRIPT_KEY: z.string(),
    VITE_KAKAO_REDIRECT_URI: z.string().url(),
  },
  runtimeEnv: import.meta.env,
});
