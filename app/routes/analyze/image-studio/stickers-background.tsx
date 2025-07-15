export default function StickersBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="-translate-x-1/2 -rotate-30 absolute top-1/12 left-0 size-20 xs:size-24"
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="absolute right-0 bottom-3/12 size-20 xs:size-24 translate-x-1/2"
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className="-translate-x-1/2 absolute bottom-1/12 left-0 size-20 xs:size-24 rotate-30"
      />
    </div>
  );
}
