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
  colorClassName: {
    text: "text-ocean" | "text-forest" | "text-lava";
    darkText: "text-ocean-dark" | "text-forest-dark" | "text-lava-dark";
    background: "bg-ocean" | "bg-forest" | "bg-lava";
  };
  Highlight: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  discription: string;
  aiFaceClassName?: string;
  asterisks: {
    defaultColor: "text-ocean" | "text-forest" | "text-lava";
    positions: Position[];
  };
  labelClassName: string;
}
