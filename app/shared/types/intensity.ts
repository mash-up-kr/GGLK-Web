export interface Intensity {
  id: number;
  value: "easy" | "normal" | "spicy";
  level: 1 | 2 | 3;
  MainIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor: "bg-ocean" | "bg-forest" | "bg-lava";
  discription: string;
  aiFaceClassName?: string;
}
