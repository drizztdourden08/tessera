/* @layer renderer-components @kind types */
import type { ColorMode } from '../ColorPicker.type';

interface ModePanelProps {
  value: string;
  onChange: (hex: string) => void;
  alpha: number;
  onAlphaChange?: (alpha: number) => void;
  disableAlpha: boolean;
}

interface ModeSwitchProps extends ModePanelProps {
  mode: ColorMode;
}

interface ModeTabsProps {
  modes: readonly ColorMode[];
  mode: ColorMode;
  onModeChange: (mode: ColorMode) => void;
}

export type { ModePanelProps, ModeSwitchProps, ModeTabsProps };
