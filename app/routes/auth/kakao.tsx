import { useEffect, useRef } from "react";

import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import { useAuthControllerKakaoLoginHandler } from "~/api/endpoints/api";
import { AUTH_KEY } from "~/shared/constants";

export default function Kakao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies();
  const effectRan = useRef(false);

  const { mutateAsync } = useAuthControllerKakaoLoginHandler();

  const code = searchParams.get("code");

  const codeParseResult = z.string().safeParse(code);

  if (!codeParseResult.success) {
    throw new Error(codeParseResult.error.message);
  }

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (effectRan.current === true) {
      console.log("개발 모드 재마운트로 인한 실행 방지");
      return;
    }

    const runMutation = async () => {
      try {
        const data = await mutateAsync({
          data: {
            code: codeParseResult.data,
            redirectUri: `${window.location.origin}/auth/kakao`,
          },
        });

        const dataParseResult = z
          .object({ data: z.object({ token: z.string() }) })
          .safeParse(data);

        if (dataParseResult.success) {
          setCookie(AUTH_KEY, dataParseResult.data.data.token, {
            path: "/",
          });
        }
      } catch (error) {}

      navigate("/", {
        replace: true,
      });
    };

    runMutation();

    return () => {
      effectRan.current = true;
    };
  }, []);

  return null;
}
