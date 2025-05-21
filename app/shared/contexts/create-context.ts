import {
  createContext as createReactContext,
  useContext as useReactContext,
} from "react";

/**
 * Context 생성 옵션을 정의하는 인터페이스
 * @template T - Context에 저장될 값의 타입
 */
export interface createContextOptions<T> {
  /** Context의 이름 (디버깅 목적) */
  contextName?: string;
  /** Context의 기본값 */
  defaultValue?: T;
  /** 생성될 Hook의 이름 (에러 메시지에 사용) */
  hookName?: string;
  /** Provider 컴포넌트의 이름 (에러 메시지에 사용) */
  providerName?: string;
  /** 커스텀 에러 메시지 */
  errorMessage?: string;
}

const getUseContextErrorMessage = (
  hookName?: string,
  providerName?: string,
  errorMessage?: string,
) => {
  return (
    errorMessage ??
    `${hookName}가 undefined를 반환했습니다. ${providerName}으로 컴포넌트를 감쌌는지 확인해주세요.`
  );
};

/**
 * React Context를 생성하고 관련 Hook과 Provider를 반환하는 유틸리티 함수
 *
 * @template T - Context에 저장될 값의 타입
 * @param options - Context 생성 옵션
 * - `contextName`: Context의 이름 (디버깅 목적)
 * - `defaultValue`: Context의 기본값
 * - `hookName`: 생성될 Hook의 이름 (기본값: "useContext")
 * - `providerName`: Provider 컴포넌트의 이름 (기본값: "Context.Provider")
 * - `errorMessage`: 커스텀 에러 메시지
 *
 * @returns [Provider, useContext, Context] 튜플을 반환합니다:
 * - `Provider`: Context 값을 제공하는 Provider 컴포넌트
 * - `useContext`: Context 값을 사용하기 위한 Hook
 * - `Context`: 생성된 Context 객체
 *
 * @example
 * ```tsx
 * const [UserProvider, useUser, UserContext] = createContext<User>({
 *   contextName: 'UserContext',
 *   hookName: 'useUser',
 *   providerName: 'UserProvider'
 * });
 *
 * // 사용 예시
 * function App() {
 *   // 실제 사용 시에는 API나 다른 소스에서 데이터를 가져올 수 있습니다
 *   const user = {
 *     id: '1',
 *     name: '홍길동',
 *     email: 'hong@example.com'
 *   };
 *
 *   return (
 *     <UserProvider value={user}>
 *       <Child />
 *     </UserProvider>
 *   );
 * }
 *
 * function Child() {
 *   const user = useUser(); // 타입이 보장된 user 객체 반환
 *   return <div>{user.name}</div>;
 * }
 * ```
 */
export function createContext<T>(options: createContextOptions<T> = {}) {
  const {
    contextName,
    defaultValue,
    hookName = "useContext",
    providerName = "Context.Provider",
    errorMessage,
  } = options;

  const Context = createReactContext<T | undefined>(defaultValue);

  Context.displayName = contextName;

  function useContext() {
    const value = useReactContext(Context);
    if (!value) {
      const error = new Error(
        getUseContextErrorMessage(hookName, providerName, errorMessage),
      );
      error.name = "ContextError";

      throw error;
    }

    return value;
  }

  return [Context.Provider, useContext, Context] as const;
}
