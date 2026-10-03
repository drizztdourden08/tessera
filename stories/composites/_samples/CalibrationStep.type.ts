/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface CalibrationStepAction {
  label: string;
  disabled?: boolean;
  onClick: () => void;
}

interface CalibrationStepProps {
  title: string;
  instruction: string;
  readout: string;
  action: CalibrationStepAction;
  onCancel: () => void;
  children: ReactNode;
}

export type { CalibrationStepAction, CalibrationStepProps };
