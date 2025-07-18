import { AnimatePresence, motion, useAnimate, useCycle } from "motion/react";
import {
  type ComponentRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useNavigate } from "react-router";
import HamburgerMenu from "~/assets/hamburger-menu.svg?react";
import IconFirst from "~/assets/icon-first.svg?react";
import IconSecond from "~/assets/icon-second.svg?react";
import IconThird from "~/assets/icon-third.svg?react";
import LogoForest from "~/assets/logo-forest.svg?react";
import LogoOcean from "~/assets/logo-ocean.svg?react";
import LogoWhite from "~/assets/logo-white.svg?react";
import PaperTextureLayer from "~/shared/components/paper-texture-layer";
import { Sidebar } from "~/shared/components/sidebar";
import { TypingEffect } from "~/shared/components/typing-effect";
import { useInterval } from "~/shared/hooks/use-interval";
import { cn } from "~/shared/utils/classname-utils";

type HomeHeaderProps = {
  className?: string;
  backgroundColor: string;
  logo: React.ReactNode;
  toggleOpenSidebar: () => void;
};

const HomeHeader = ({
  className,
  backgroundColor,
  logo,
  toggleOpenSidebar,
}: HomeHeaderProps) => {
  return (
    <header
      className={cn(
        "flex items-center justify-between py-0.25 pr-4 pl-1.5",
        className,
      )}
      style={{ background: backgroundColor }}
    >
      <button type="button" className="cursor-pointer">
        {logo}
      </button>

      <button
        type="button"
        onClick={() => toggleOpenSidebar()}
        className="cursor-pointer"
      >
        <HamburgerMenu className="text-white" />
      </button>
    </header>
  );
};

type CharMotionComponentProps = {
  containerHeight?: number;
  color: string;
};

type FirstOCharMotionComponentProps = CharMotionComponentProps;
type SecondOCharMotionComponentProps = CharMotionComponentProps;
type TCharMotionComponentProps = CharMotionComponentProps;
type DCharMotionComponentProps = CharMotionComponentProps;

const FirstOCharMotionComponent = ({
  containerHeight,
  color,
}: FirstOCharMotionComponentProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (containerHeight && scope.current) {
      animate(
        scope.current,
        { opacity: [0, 1] },
        { duration: 0.2, delay: 0.5 },
      );
      animate(
        scope.current,
        {
          y: [
            0,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 120%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 105%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 102%)`,
            `calc(${containerHeight}px - 100%)`,
          ],
        },
        {
          delay: 0.5,
          duration: 1,
        },
      );
    }
  }, [containerHeight, animate, scope]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <motion.svg
      ref={scope}
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="180"
      viewBox="0 0 80 180"
      fill="none"
      style={{
        opacity: 0,
      }}
    >
      <path
        d="M79.9131 179.082H0V0H79.9131V179.082ZM26.959 38.5127V142.495H52.9541V38.5127H26.959Z"
        fill={color}
      />
    </motion.svg>
  );
};

const SecondOCharMotionComponent = ({
  containerHeight,
  color,
}: SecondOCharMotionComponentProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (containerHeight && scope.current) {
      animate(
        scope.current,
        { opacity: [0, 1] },
        { duration: 0.2, delay: 0.6 },
      );
      animate(
        scope.current,
        {
          y: [
            0,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 120%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 101%)`,
            `calc(${containerHeight}px - 100%)`,
          ],
        },
        {
          delay: 0.6,
          duration: 1,
        },
      );
    }
  }, [containerHeight, animate, scope]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <motion.svg
      ref={scope}
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="180"
      viewBox="0 0 80 180"
      fill="none"
      style={{
        opacity: 0,
      }}
    >
      <path
        d="M79.9131 179.082H0V0H79.9131V179.082ZM26.959 38.5127V142.495H52.9541V38.5127H26.959Z"
        fill={color}
      />
    </motion.svg>
  );
};

const TCharMotionComponent = ({
  containerHeight,
  color,
}: TCharMotionComponentProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (containerHeight && scope.current) {
      animate(
        scope.current,
        { opacity: [0, 1] },
        { duration: 0.2, delay: 0.7 },
      );
      animate(
        scope.current,
        {
          y: [
            0,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 120%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 105%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 101%)`,
            `calc(${containerHeight}px - 100%)`,
          ],
        },
        {
          delay: 0.7,
          duration: 1,
        },
      );
    }
  }, [containerHeight, animate, scope]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <motion.svg
      ref={scope}
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="179"
      viewBox="0 0 80 179"
      fill="none"
      style={{
        opacity: 0,
      }}
    >
      <path d="M80 39H54V179H26V39H0V0H80V39Z" fill={color} />
    </motion.svg>
  );
};
const DCharMotionComponent = ({
  containerHeight,
  color,
}: DCharMotionComponentProps) => {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    if (containerHeight && scope.current) {
      animate(
        scope.current,
        { opacity: [0, 1] },
        { duration: 0.2, delay: 0.8 },
      );
      animate(
        scope.current,
        {
          y: [
            0,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 120%)`,
            `calc(${containerHeight}px - 100%)`,
            `calc(${containerHeight}px - 101%)`,
            `calc(${containerHeight}px - 100%)`,
          ],
        },
        {
          delay: 0.8,
          duration: 1,
        },
      );
    }
  }, [containerHeight, animate, scope]);

  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <motion.svg
      ref={scope}
      xmlns="http://www.w3.org/2000/svg"
      width="79"
      height="180"
      viewBox="0 0 79 180"
      fill="none"
      style={{
        opacity: 0,
      }}
    >
      <path
        d="M79 16.8564V158.729L63.9795 179.082H0V0H66.5596L79 16.8564ZM26.6504 142.495H52.3496V38.5127H26.6504V142.495Z"
        fill={color}
      />
    </motion.svg>
  );
};

type StepProps = {
  backgroundColor: string;
  textColor: string;
  toggleOpenSidebar: () => void;
};

const FirstStep = ({
  backgroundColor,
  textColor,
  toggleOpenSidebar,
}: StepProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const imageRef = useRef<ComponentRef<"img">>(null);

  const navigate = useNavigate();

  const content = useMemo(
    () => [
      ["반가워", <IconFirst key="icon-first" />],
      ["패션 매거진 편집장"],
      ["엘리스 제인이야"],
    ],
    [],
  );

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  return (
    <>
      <PaperTextureLayer />
      <HomeHeader
        backgroundColor={backgroundColor}
        logo={<LogoOcean />}
        toggleOpenSidebar={toggleOpenSidebar}
      />
      <div
        className="flex h-full w-full flex-col justify-between pb-10"
        style={{ background: backgroundColor }}
      >
        <div>
          <div className="h-8" />
          <div className="relative h-36 px-4">
            <TypingEffect
              lines={content}
              startDelay={2000}
              className="font-[900] text-[40px] leading-[1.2] tracking-[0]"
              style={{ color: textColor }}
              onComplete={handleTypingComplete}
            />
          </div>
          <div className="h-[15px]" />
          <div className="px-4">
            {isTypingComplete && (
              <button
                type="button"
                className="inline-flex max-w-max cursor-pointer items-center gap-2 rounded-full border px-5 py-[9px]"
                style={{ borderColor: textColor }}
                onClick={() => navigate("/analyze")}
              >
                <span
                  className="font-bold text-[15px] leading-[1.2]"
                  style={{ color: textColor }}
                >
                  Start Fashion of AI
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="8"
                  viewBox="0 0 18 8"
                  fill="none"
                >
                  <title>arrow</title>
                  <path
                    d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4V4.5H17V4V3.5H0V4Z"
                    fill={textColor}
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="h-1/2 pb-10">
          <div
            className="flex h-full justify-center gap-2"
            ref={(containerRef) => {
              if (containerRef) {
                setContainerHeight(containerRef.clientHeight);
              }
            }}
          >
            <div className="relative flex gap-2">
              <FirstOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <SecondOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <TCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <DCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <motion.img
                ref={imageRef}
                src="/png/home-face.png"
                alt="엘리스 제인"
                className={cn(
                  "absolute right-2 bottom-47.5 z-50 opacity-0",
                  isTypingComplete && "animate-rotate-snap opacity-100",
                )}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const SecondStep = ({
  backgroundColor,
  textColor,
  toggleOpenSidebar,
}: StepProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const imageRef = useRef<ComponentRef<"img">>(null);

  const navigate = useNavigate();

  const content = useMemo(
    () => [
      ["지금부터", <IconSecond key="icon-second" />],
      ["너의 패션 스타일을"],
      ["면밀하게 평가하겠어"],
    ],
    [],
  );

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  return (
    <>
      <PaperTextureLayer />
      <HomeHeader
        backgroundColor={backgroundColor}
        logo={<LogoForest />}
        toggleOpenSidebar={toggleOpenSidebar}
      />
      <div
        className="flex h-full w-full flex-col justify-between pb-10"
        style={{ background: backgroundColor }}
      >
        <div>
          <div className="h-8" />
          <div className="relative h-36 px-4">
            <TypingEffect
              lines={content}
              startDelay={2000}
              className="align-top font-[900] text-[40px] leading-[1.2] tracking-[0]"
              style={{ color: textColor }}
              onComplete={handleTypingComplete}
            />
          </div>
          <div className="h-[15px]" />
          <div className="px-4">
            {isTypingComplete && (
              <button
                type="button"
                className="inline-flex max-w-max cursor-pointer items-center gap-2 rounded-full border px-5 py-[9px]"
                style={{ borderColor: textColor }}
                onClick={() => navigate("/analyze")}
              >
                <span
                  className="font-bold text-[15px] leading-[1.2]"
                  style={{ color: textColor }}
                >
                  Start Fashion of AI
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="8"
                  viewBox="0 0 18 8"
                  fill="none"
                >
                  <title>arrow</title>
                  <path
                    d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4V4.5H17V4V3.5H0V4Z"
                    fill={textColor}
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="h-1/2 pb-10">
          <div
            className="relative flex h-full justify-center gap-2"
            ref={(containerRef) => {
              if (containerRef) {
                setContainerHeight(containerRef.clientHeight);
              }
            }}
          >
            <div className="relative flex gap-2">
              <FirstOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <SecondOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <TCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <DCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <motion.img
                ref={imageRef}
                src="/png/home-face.png"
                alt="엘리스 제인"
                className={cn(
                  "absolute right-2 bottom-47.5 z-50 opacity-0",
                  isTypingComplete && "animate-rotate-snap opacity-100",
                )}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
const ThirdStep = ({
  backgroundColor,
  textColor,
  toggleOpenSidebar,
}: StepProps) => {
  const [containerHeight, setContainerHeight] = useState(0);
  const imageRef = useRef<ComponentRef<"img">>(null);

  const navigate = useNavigate();

  const content = useMemo(
    () => [
      ["초상권은", <IconThird key="icon-third" />],
      ["걱정하지말고"],
      ["지금 시작해보라구"],
    ],
    [],
  );

  const [isTypingComplete, setIsTypingComplete] = useState(false);

  const handleTypingComplete = useCallback(() => {
    setIsTypingComplete(true);
  }, []);

  return (
    <>
      <PaperTextureLayer />
      <HomeHeader
        backgroundColor={backgroundColor}
        logo={<LogoWhite />}
        toggleOpenSidebar={toggleOpenSidebar}
      />
      <div
        className="flex h-full w-full flex-col justify-between pb-10"
        style={{ background: backgroundColor }}
      >
        <div>
          <div className="h-8" />
          <div className="relative h-36 px-4">
            <TypingEffect
              lines={content}
              startDelay={2000}
              className="align-top font-[900] text-[40px] leading-[1.2] tracking-[0]"
              style={{ color: textColor }}
              onComplete={handleTypingComplete}
            />
          </div>
          <div className="h-[15px]" />
          <div className="px-4">
            {isTypingComplete && (
              <button
                type="button"
                className="inline-flex max-w-max cursor-pointer items-center gap-2 rounded-full border px-5 py-[9px]"
                style={{ borderColor: textColor }}
                onClick={() => navigate("/analyze")}
              >
                <span
                  className="font-bold text-[15px] leading-[1.2]"
                  style={{ color: textColor }}
                >
                  Start Fashion of AI
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="8"
                  viewBox="0 0 18 8"
                  fill="none"
                >
                  <title>arrow</title>
                  <path
                    d="M17.3536 4.35355C17.5488 4.15829 17.5488 3.84171 17.3536 3.64645L14.1716 0.464466C13.9763 0.269204 13.6597 0.269204 13.4645 0.464466C13.2692 0.659728 13.2692 0.976311 13.4645 1.17157L16.2929 4L13.4645 6.82843C13.2692 7.02369 13.2692 7.34027 13.4645 7.53553C13.6597 7.7308 13.9763 7.7308 14.1716 7.53553L17.3536 4.35355ZM0 4V4.5H17V4V3.5H0V4Z"
                    fill={textColor}
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
        <div className="h-1/2 pb-10">
          <div
            className="flex h-full justify-center gap-2"
            ref={(containerRef) => {
              if (containerRef) {
                setContainerHeight(containerRef.clientHeight);
              }
            }}
          >
            <div className="relative flex gap-2">
              <FirstOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <SecondOCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <TCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <DCharMotionComponent
                containerHeight={containerHeight}
                color={textColor}
              />
              <motion.img
                ref={imageRef}
                src="/png/home-face.png"
                alt="엘리스 제인"
                className={cn(
                  "absolute right-2 bottom-47.5 z-50 opacity-0",
                  isTypingComplete && "animate-rotate-snap opacity-100",
                )}
                width={100}
                height={100}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

const sliderVariants = {
  // 오른쪽에서 들어오는 애니메이션
  initial: {
    x: "100%",
  },
  animate: {
    x: 0,
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
  // 왼쪽으로 나가는 애니메이션
  exit: {
    x: "-100%",
    transition: {
      duration: 0.5,
      ease: "easeInOut",
    },
  },
};

export default function Home() {
  const [step, toNextStep] = useCycle(
    ...[
      { name: "first", backgroundColor: "#000000", textColor: "#1c4ae4" },
      { name: "second", backgroundColor: "#ff4431", textColor: "#adffbc" },
      { name: "third", backgroundColor: "#21dc71", textColor: "#ffffff" },
    ],
  );

  const [isOpenSidebar, toggleOpenSidebar] = useCycle(false, true);

  useInterval(() => {
    toNextStep();
  }, 11000);

  return (
    <>
      <div
        className="relative h-full overflow-hidden"
        style={{
          background: step.backgroundColor,
        }}
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={step.name}
            variants={sliderVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="h-full w-full"
          >
            {step.name === "first" && (
              <FirstStep
                backgroundColor={step.backgroundColor}
                textColor={step.textColor}
                toggleOpenSidebar={toggleOpenSidebar}
              />
            )}
            {step.name === "second" && (
              <SecondStep
                backgroundColor={step.backgroundColor}
                textColor={step.textColor}
                toggleOpenSidebar={toggleOpenSidebar}
              />
            )}
            {step.name === "third" && (
              <ThirdStep
                backgroundColor={step.backgroundColor}
                textColor={step.textColor}
                toggleOpenSidebar={toggleOpenSidebar}
              />
            )}
          </motion.div>
        </AnimatePresence>
        {isOpenSidebar && <Sidebar toggleOpen={toggleOpenSidebar} />}
      </div>
    </>
  );
}
