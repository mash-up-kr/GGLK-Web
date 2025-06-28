interface HeaderProps {
  onPrevious: () => void;
}

export default function Header({ onPrevious }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3.5">
      <button type="button" onClick={onPrevious} className="cursor-pointer">
        이전
      </button>
      <button type="button" onClick={() => {}} className="cursor-pointer">
        메뉴
      </button>
    </header>
  );
}
