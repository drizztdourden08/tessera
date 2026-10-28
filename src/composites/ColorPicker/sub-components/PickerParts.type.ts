/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ColorMode } from '../ColorPicker.type';
import type { ModePanelProps } from './ModePanel.type';

interface PickerHeaderProps {
  title?: string;
  name?: ReactNode;
}

interface PickerBodyProps {
  panel: ModePanelProps;
  modes: readonly ColorMode[];
  mode?: ColorMode;
  onModeChange?: (mode: ColorMode) => void;
}

interface PickerActionsProps {
  onReset?: () => void;
  onClose?: () => void;
  footer?: ReactNode;
}

export type { PickerActionsProps, PickerBodyProps, PickerHeaderProps };
