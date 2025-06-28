import ChevronLeft from "~/assets/chevron-left.svg?react";
import HamburgerMenu from "~/assets/hamburger-menu.svg?react";

interface HeaderProps {
  onPrevious: () => void;
}

export default function Header({ onPrevious }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3.5">
      <button type="button" onClick={onPrevious} className="cursor-pointer">
        <ChevronLeft className="text-white" />
      </button>
      <button type="button" onClick={() => {}} className="cursor-pointer">
        <HamburgerMenu className="text-white" />
      </button>
    </header>
  );
}
