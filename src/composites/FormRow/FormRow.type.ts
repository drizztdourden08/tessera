/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FoldOverflow } from '../../primitives/FoldText';

interface FormRowProps {
  label: string;
  description?: ReactNode;
  descriptionLines?: number;
  descriptionOverflow?: FoldOverflow;
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
  descriptionOverflow?: FoldOverflow;
  descriptionId: string;
  changed: boolean;
  advanced: boolean;
  onReset?: () => void;
}

export type { FormRowHeadProps, FormRowProps };
