import { tv } from "tailwind-variants";

const stickers = tv({
  slots: {
    container:
      "absolute inset-0 px-2 py-1 flex flex-col gap-0.5 pointer-events-none z-40 overflow-hidden",
    sticker: "absolute size-20 xs:size-24",
  },
});

interface StickersBackgroundProps {
  firstStickerClassName: string;
  secondStickerClassName: string;
  thirdStickerClassName: string;
}

export default function StickersBackground({
  firstStickerClassName,
  secondStickerClassName,
  thirdStickerClassName,
}: StickersBackgroundProps) {
  const { container, sticker } = stickers();
  return (
    <div className={container()}>
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className={sticker({ class: firstStickerClassName })}
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className={sticker({ class: secondStickerClassName })}
      />
      <img
        src="/png/iconSmile.png"
        alt="IconSmile"
        className={sticker({ class: thirdStickerClassName })}
      />
    </div>
  );
}
