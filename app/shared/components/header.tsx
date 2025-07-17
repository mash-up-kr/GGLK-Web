import { useState } from "react";
import ChevronLeft from "~/assets/chevron-left.svg?react";
import CloseIcon from "~/assets/close.svg?react";
import HamburgerMenu from "~/assets/hamburger-menu.svg?react";
import { cn } from "../utils/classname-utils";
import { Sidebar } from "./sidebar";

interface HeaderProps {
  onPrevious?: () => void;
  className?: string;
}

export default function Header({ onPrevious, className }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header
        className={cn(
          "z-50 flex items-center justify-between px-4 py-3.5",
          className,
        )}
      >
        <button
          type="button"
          onClick={onPrevious}
          className={cn(
            "cursor-pointer",
            (!onPrevious || isMenuOpen) && "invisible",
          )}
        >
          <ChevronLeft />
        </button>
        {isMenuOpen ? (
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <CloseIcon />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="cursor-pointer"
          >
            <HamburgerMenu />
          </button>
        )}
      </header>
      {isMenuOpen && (
        <Sidebar toggleOpen={() => setIsMenuOpen((prev) => !prev)} />
      )}
    </>
  );
}
