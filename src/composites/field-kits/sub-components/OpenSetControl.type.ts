/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface OpenSetControlProps {
  current: string;
  label: string;
  onSubmit: (value: string) => void;
  disabled?: boolean;
  children: ReactNode;
}

export type { OpenSetControlProps };
