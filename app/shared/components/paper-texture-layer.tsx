import { cn } from "../utils/classname-utils";

interface PaperTextureLayerProps {
  className?: string;
}

export default function PaperTextureLayer({
  className,
}: PaperTextureLayerProps) {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 bg-[url('/png/paper-texture.png')] bg-center bg-cover bg-no-repeat mix-blend-multiply",
        className,
      )}
    />
  );
}
