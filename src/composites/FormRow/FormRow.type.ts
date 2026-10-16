/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FormRowProps {
  label: string;
  description?: ReactNode;
  descriptionLines?: number;
  help?: ReactNode;
  changed?: boolean;
  advanced?: boolean;
  problem?: ReactNode;
  onReset?: () => void;
  id?: string;
  children: ReactNode;
  className?: string;
}

interface FormRowHeadProps {
  label: string;
  labelId: string;
  controlId: string;
  onNameClick: () => void;
  help?: ReactNode;
  description?: ReactNode;
  descriptionLines: number;
  descriptionId: string;
  changed: boolean;
  advanced: boolean;
}

export type { FormRowHeadProps, FormRowProps };
