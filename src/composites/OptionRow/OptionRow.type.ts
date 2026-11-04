/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { FoldOverflow } from '../../primitives/FoldText';

interface OptionRowProps {
  label: string;
  description?: ReactNode;
  descriptionLines?: number;
  descriptionOverflow?: FoldOverflow;
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

type OptionRowTextProps = Pick<OptionRowProps, 'label' | 'description' | 'descriptionLines' | 'descriptionOverflow' | 'tag' | 'note' | 'changed' | 'onReset' | 'forced'>;

export type { OptionRowProps, OptionRowTextProps };
