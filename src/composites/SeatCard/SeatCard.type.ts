/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../primitives/Title';
import type { ActionItem } from '../ActionBar';

interface SeatCardFilledProps {
  state: 'filled' | 'attention';
  name: ReactNode;
  lead?: ReactNode;
  meta?: ReactNode;
  reason?: string;
  actions?: readonly ActionItem[];
  onSelect?: () => void;
  level?: HeadingLevel;
  className?: string;
}

interface SeatCardEmptyProps {
  state: 'empty';
  label: ReactNode;
  hint?: ReactNode;
  className?: string;
}

interface SeatCardAddProps {
  state: 'add';
  label: string;
  onSelect: () => void;
  disabled?: boolean;
  className?: string;
}

type SeatCardProps = SeatCardFilledProps | SeatCardEmptyProps | SeatCardAddProps;

type SeatCardTextProps = Pick<SeatCardFilledProps, 'name' | 'meta' | 'reason' | 'onSelect'> & { level: HeadingLevel };

export type { SeatCardAddProps, SeatCardEmptyProps, SeatCardFilledProps, SeatCardProps, SeatCardTextProps };
