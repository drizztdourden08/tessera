/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../../primitives/Title';

interface WizardStepProps {
  title: string;
  description?: ReactNode;
  error?: string | null;
  level?: HeadingLevel;
  focusOnOpen?: boolean;
  className?: string;
  children?: ReactNode;
}

export type { WizardStepProps };
