import { useEffect } from "react";

import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { useAuthControllerKakaoLoginHandler } from "~/api/endpoints/api";
import { AUTH_KEY } from "~/shared/constants";

export default function Kakao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies();

  const kakaoLoginHandler = useAuthControllerKakaoLoginHandler();

  const code = searchParams.get("code");

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    const codeParseResult = z.string().safeParse(code);

    if (!codeParseResult.success) {
      throw new Error(codeParseResult.error.message);
    }

    kakaoLoginHandler.mutate(
      {
        data: {
          code: codeParseResult.data,
          redirectUri: `${window.location.origin}/auth/kakao`,
        },
      },
      {
        onSuccess: (data: unknown) => {
          const dataParseResult = z
            .object({ data: z.object({ token: z.string() }) })
            .safeParse(data);

          if (dataParseResult.success) {
            setCookie(AUTH_KEY, dataParseResult.data.data.token);
          }
        },
        onSettled: () => {
          navigate("/", {
            replace: true,
          });
        },
      },
    );
  }, [code, navigate, setCookie]);

  return null;
}
