import React, {
  Children,
  type ComponentPropsWithoutRef,
  type ReactNode,
  useState,
} from "react";
import type { FieldValues, Path, UseFormReturn } from "react-hook-form";

type FunnelProps = ComponentPropsWithoutRef<"div">;

type StepProps = {
  children: ReactNode;
  name: string;
};

export default function useFunnelWithForm<
  T extends { name: string },
  D extends FieldValues = FieldValues,
>({
  defaultStep,
  steps,
  methods,
  onSubmit,
}: {
  defaultStep: T;
  steps: (T & { validatePath?: Path<D>[] })[];
  methods: UseFormReturn<D>;
  onSubmit: (data: D) => void;
}) {
  const { trigger, handleSubmit } = methods;
  const [step, setStep] = useState<T>(defaultStep);

  const getCurrentStepIndex = () =>
    steps.findIndex((s) => s.name === step.name);

  const canMoveToNext = async () => {
    const currentIndex = getCurrentStepIndex();
    const currentStep = steps[currentIndex];

    return (
      currentIndex < steps.length - 1 &&
      (await trigger(currentStep.validatePath))
    );
  };

  const canMoveToPrevious = () => {
    const currentIndex = getCurrentStepIndex();
    return currentIndex > 0;
  };

  const onNext = async () => {
    const currentIndex = getCurrentStepIndex();
    const isValid = await canMoveToNext();

    if (isValid) {
      setStep(steps[currentIndex + 1]);
    } else {
      if (currentIndex === steps.length - 1) {
        handleSubmit(onSubmit)();
      }
    }
  };

  const onPrev = () => {
    if (canMoveToPrevious()) {
      setStep(steps[getCurrentStepIndex() - 1]);
    }
  };

  const Step = ({ children }: StepProps) => <>{children}</>;

  const Funnel = ({ children, className, ...props }: FunnelProps) => {
    const targetStep = Children.toArray(children).find((child) => {
      if (!React.isValidElement(child)) return false;
      const childProps = child.props as StepProps;
      return childProps.name === step.name;
    });

    // targetStep이 없거나 유효하지 않은 요소인 경우 렌더링하지 않음
    if (!targetStep || !React.isValidElement(targetStep)) {
      return null;
    }

    return (
      <div className={className} {...props}>
        {targetStep}
      </div>
    );
  };

  Funnel.Step = Step;

  return {
    Funnel,
    onNext,
    onPrev,
  } as const;
}
