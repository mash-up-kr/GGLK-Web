import React, {
  Children,
  useCallback,
  useRef,
  useState,
  type ComponentPropsWithoutRef,
  type ReactNode,
} from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FunnelProps = ComponentPropsWithoutRef<"div">;

type StepProps = {
  children: ReactNode;
  field: string;
};

interface FunnelConfig<D extends FieldValues = FieldValues> {
  methods: UseFormReturn<D>;
  onSubmit: (data: D) => void;
  onStepChange?: () => void;
}

export default function useFunnelWithForm<D extends FieldValues = FieldValues>({
  methods,
  onSubmit,
  onStepChange,
}: FunnelConfig<D>) {
  const { trigger, handleSubmit } = methods;
  // const [step, setStep] = useState<T>(defaultStep);
  const [step, setStep] = useState<number>(0);
  const history = useRef<Path<D>[]>([]);

  const lastStepIndex = useRef<number>(null);

  const canMoveToNext = useCallback(async () => {
    if (step >= (lastStepIndex.current ?? 0)) {
      return false;
    }

    return await trigger([...new Set(history.current)]);
  }, [step, trigger]);

  const canMoveToPrevious = useCallback(() => {
    return step > 0;
  }, [step]);

  const onNext = useCallback(async () => {
    const isLastStep = step === (lastStepIndex.current ?? 0);

    if (isLastStep) {
      // 마지막 스텝에서는 전체 폼 검증 후 제출
      const isValid = await trigger();
      if (isValid) {
        handleSubmit(onSubmit)();
      }
    } else {
      // 중간 스텝에서는 현재까지 수정된 필드들만 검증
      const isValid = await canMoveToNext();
      if (isValid) {
        setStep((prev) => prev + 1);
        onStepChange?.();
      }
    }

    console.log("🎯 onNext", step);
  }, [step, trigger, handleSubmit, onSubmit, canMoveToNext, onStepChange]);

  const onPrev = useCallback(() => {
    if (canMoveToPrevious()) {
      setStep((prev) => prev - 1);
      onStepChange?.();
      history.current.pop();
    }
  }, [canMoveToPrevious, onStepChange]);

  const Funnel = useCallback(
    ({ children, className, ...props }: FunnelProps) => {
      if (lastStepIndex.current === null) {
        lastStepIndex.current = Children.toArray(children).length - 1;
      }

      const targetStep = Children.toArray(children)[
        step
      ] as React.ReactElement<StepProps>;

      // targetStep이 없거나 유효하지 않은 요소인 경우 렌더링하지 않음
      if (!targetStep || !React.isValidElement(targetStep)) {
        return null;
      }

      const { field } = targetStep.props;

      // field 검증
      if (!field) {
        throw new Error(
          "Funnel 컴포넌트의 자식 컴포넌트들은 반드시 field 속성을 가져야 합니다.",
        );
      }

      if (!history.current.includes(field as Path<D>)) {
        history.current.push(field as Path<D>);
      }

      return (
        <div className={className} {...props}>
          {targetStep}
        </div>
      );
    },
    [step],
  );

  return {
    step,
    methods,
    Funnel,
    onNext,
    onPrev,
  } as const;
}
