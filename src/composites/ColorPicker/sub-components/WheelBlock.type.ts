/* @layer renderer-components @kind types */
interface WheelBlockProps {
  value: string;
  onChange: (hex: string) => void;
  alpha: number;
  onAlphaChange?: (alpha: number) => void;
  disableAlpha: boolean;
}

export type { WheelBlockProps };
