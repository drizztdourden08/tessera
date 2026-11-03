/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface OptionRowProps {
  label: string;
  description?: ReactNode;
  tag?: string;
  note?: ReactNode;
  locked?: boolean;
  forced?: boolean;
  changed?: boolean;
  onReset?: () => void;
  control: ReactNode;
  aside?: ReactNode;
  className?: string;
}

type OptionRowTextProps = Pick<OptionRowProps, 'label' | 'description' | 'tag' | 'note' | 'changed' | 'onReset' | 'forced'>;

export type { OptionRowProps, OptionRowTextProps };
