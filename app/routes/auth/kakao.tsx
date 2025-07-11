import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router";
import { z } from "zod";
import type { KakakoLoginRequestDto } from "~/api/model";
import { customInstance } from "~/api/mutator/custom-instance";

export default function Kakao() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [_, setCookie] = useCookies();

  const code = searchParams.get("code");

  useEffect(() => {
    const codeParseResult = z.string().safeParse(code);

    if (!codeParseResult.success) {
      throw new Error(codeParseResult.error.message);
    }

    (async () => {
      const data: KakakoLoginRequestDto = {
        code: codeParseResult.data,
        redirectUri: import.meta.env.VITE_KAKAO_REDIRECT_URI,
      };

      try {
        const token = await customInstance<{ data: { token: string } }>({
          method: "POST",
          url: "/auth/kakao",
          data,
        });

        setCookie("Authorization", token.data.token);

        navigate("/", {
          replace: true,
        });
      } catch (e) {
        if (e instanceof Error) {
          console.error(e.message);
        }
      }
    })();
  }, [code, setCookie, navigate]);

  return null;
}
