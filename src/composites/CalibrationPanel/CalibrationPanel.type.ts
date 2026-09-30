/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface CalibrationPanelAction {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

interface CalibrationPanelProps {
  title: ReactNode;
  instruction: ReactNode;
  readout?: ReactNode;
  action: CalibrationPanelAction;
  onCancel: () => void;
  cancelLabel?: string;
  children?: ReactNode;
  className?: string;
}

export type { CalibrationPanelAction, CalibrationPanelProps };
