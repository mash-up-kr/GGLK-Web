import { useState } from "react";
import { Link } from "react-router";
import ChevronLeft from "~/assets/chevron-left.svg?react";
import CloseIcon from "~/assets/close.svg?react";
import HamburgerMenu from "~/assets/hamburger-menu.svg?react";
import { cn } from "../utils/classname-utils";

interface HeaderProps {
  onPrevious?: () => void;
}

export default function Header({ onPrevious }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  return (
    <>
      <header
        className={cn(
          "flex items-center justify-between px-4 py-3.5",
          isMenuOpen && "bg-black",
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
          <ChevronLeft className="text-white" />
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
            <HamburgerMenu className="text-white" />
          </button>
        )}
      </header>

      {isMenuOpen && <NavMenu />}
    </>
  );
}

function NavMenu() {
  return (
    <div className="absolute inset-0 mt-13 bg-black px-4">
      <div className="flex flex-col space-y-2.5 py-10 font-extrabold font-sf text-6xl text-white [&>a]:leading-[1.2]">
        <Link to="/">Home</Link>
        <Link to="#">Login</Link>
        <Link to="#">Profile</Link>
        <Link to="#">Contact</Link>
      </div>
    </div>
  );
}
