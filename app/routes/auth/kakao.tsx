import { useSearchParams } from "react-router";
import { z } from "zod";

export default function Kakao() {
  const [searchParams] = useSearchParams();

  const code = searchParams.get("code");

  const codeParseResult = z.string().safeParse(code);

  if (!codeParseResult.success) {
    throw new Error(codeParseResult.error.message);
  }

  return null;
}
