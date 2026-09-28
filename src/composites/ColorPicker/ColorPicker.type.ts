/* @layer renderer-components @kind types */
interface SwatchGroup {
  label: string;
  colors: readonly string[];
}

interface ColorPickerProps {
  value: string;
  onChange: (hex: string) => void;
  alpha?: number;
  onAlphaChange?: (alpha: number) => void;
  disableAlpha?: boolean;
  title?: string;
  original?: string;
  word?: number;
  snapped?: boolean;
  onReset?: () => void;
  onClose?: () => void;
  swatchGroups?: readonly SwatchGroup[];
}

export type { ColorPickerProps, SwatchGroup };
