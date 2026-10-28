/* @layer renderer-components @kind types */
interface ColorFieldsProps {
  value: string;
  onChange: (hex: string) => void;
  hexInput: string;
  onHexInput: (raw: string) => void;
  alpha: number;
  onAlphaChange?: (alpha: number) => void;
  disableAlpha: boolean;
  hexOnly?: boolean;
}

type Channel = 'r' | 'g' | 'b';

export type { Channel, ColorFieldsProps };
