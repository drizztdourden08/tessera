/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type ValidationTone = 'danger' | 'warning';

interface ValidationProblem {
  id: string;
  message: ReactNode;
  field?: string;
}

interface ValidationSummaryProps {
  title?: ReactNode;
  problems: readonly ValidationProblem[];
  max?: number;
  tone?: ValidationTone;
  onFocusField?: (field: string) => void;
  className?: string;
}

interface ValidationProblemRowProps {
  problem: ValidationProblem;
  onFocusField?: (field: string) => void;
}

export type { ValidationProblem, ValidationProblemRowProps, ValidationSummaryProps, ValidationTone };
