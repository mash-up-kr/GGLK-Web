import { motion } from "motion/react";
import { Link } from "react-router";
import CloseIcon from "~/assets/close.svg?react";
import LogoWhite from "~/assets/logo-white.svg?react";
import { useKakaoScript } from "../hooks/use-kakao-script";

type SidebarProps = {
  toggleOpen: () => void;
};

export const Sidebar = ({ toggleOpen }: SidebarProps) => {
  const { authorize } = useKakaoScript();

  return (
    <motion.aside
      className="absolute inset-0 z-50 bg-black"
      initial={{ x: "100%" }}
      animate={{ x: "0%" }}
      exit={{ x: "100%" }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <header className="flex h-[54px] items-center justify-between pr-4 pl-1.5">
        <LogoWhite />
        <CloseIcon onClick={() => toggleOpen()} />
      </header>
      <ul className="flex flex-col space-y-2.5 px-4 py-10 font-extrabold font-sf text-6xl text-white [&>a]:leading-[1.2]">
        <Link to="/">
          <li>Home</li>
        </Link>
        <Link to="#" onClick={() => authorize()}>
          <li>Login</li>
        </Link>
        <Link to="#">
          <li>Profile</li>
        </Link>
        <Link to="#">
          <li>Contact</li>
        </Link>
      </ul>
    </motion.aside>
  );
};
