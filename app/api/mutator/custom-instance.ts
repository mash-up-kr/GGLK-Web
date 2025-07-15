import Axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { AUTH_KEY } from "~/shared/constants";
import { authControllerGuestToken } from "../endpoints/api";

const cookies = new Cookies();

type ResponseType<T> = {
  data: T;
};

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = cookies.get(AUTH_KEY);

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

AXIOS_INSTANCE.interceptors.response.use(
  (response) => response,
  async (error) => {
    const token = cookies.get(AUTH_KEY);
    const { config, response } = error;

    if (
      response.status === 401 &&
      config.url !== "/auth/guest" &&
      !config.sent &&
      !token
    ) {
      config.sent = true;

      const {
        data: { token: guestToken },
      } = await authControllerGuestToken();

      if (guestToken) {
        config.headers.Authorization = `Bearer ${token}`;
        cookies.set(AUTH_KEY, guestToken);
      }
      return AXIOS_INSTANCE(config);
    }

    return Promise.reject(error);
  },
);
export const customInstance = <T>(
  config: AxiosRequestConfig,
): Promise<ResponseType<T>> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data as ResponseType<T>,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export interface ErrorType<Error> extends AxiosError<Error> {}
