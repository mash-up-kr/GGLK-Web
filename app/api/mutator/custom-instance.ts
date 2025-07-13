import Axios, { type AxiosError, type AxiosRequestConfig } from "axios";
import { Cookies } from "react-cookie";
import { AUTH_KEY } from "~/shared/constants";

const cookies = new Cookies();

export const AXIOS_INSTANCE = Axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

AXIOS_INSTANCE.interceptors.request.use((config) => {
  const token = cookies.get(AUTH_KEY);

  if (token) {
    config.headers.Authorization = token;
  }

  return config;
});

export const customInstance = <T>(config: AxiosRequestConfig): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({ ...config, cancelToken: source.token }).then(
    ({ data }) => data as T,
  );

  // @ts-ignore
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export interface ErrorType<Error> extends AxiosError<Error> {}
