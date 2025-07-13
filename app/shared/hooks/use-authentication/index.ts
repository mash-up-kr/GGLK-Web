import { useEffect } from "react";
import { useCookies } from "react-cookie";
import { z } from "zod";
import { useAuthControllerGuestToken } from "~/api/endpoints/api";

import { AUTH_KEY } from "~/shared/constants";

export const useAuthentication = () => {
  const [cookies, setCookie] = useCookies([AUTH_KEY]);

  const guestToken = useAuthControllerGuestToken();

  const isAuthenticated = !!cookies[AUTH_KEY];

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    if (isAuthenticated) return;

    guestToken.mutate(undefined, {
      onSuccess: (data: unknown) => {
        const dataParseResult = z
          .object({ data: z.object({ token: z.string() }) })
          .safeParse(data);

        if (dataParseResult.success) {
          setCookie(AUTH_KEY, dataParseResult.data.data.token);
        }
      },
    });
  }, [isAuthenticated, setCookie]);

  return {
    isAuthenticated,
  };
};
