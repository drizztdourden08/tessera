/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

type OptionGroupTone = 'default' | 'live';

interface OptionGroupProps {
  title: string;
  tone?: OptionGroupTone;
  className?: string;
  children?: ReactNode;
}

export type { OptionGroupProps, OptionGroupTone };
