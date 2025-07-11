interface Position {
  isOutside?: boolean;
  top: number;
  left: number;
}

export interface Intensity {
  id: number;
  value: "easy" | "normal" | "spicy";
  level: 1 | 2 | 3;
  MainIcon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  backgroundColor: "bg-ocean" | "bg-forest" | "bg-lava";
  discription: string;
  aiFaceClassName?: string;
  asterisks: {
    defaultColor: "text-ocean" | "text-forest" | "text-lava";
    positions: Position[];
  };
  labelClassName: string;
}
