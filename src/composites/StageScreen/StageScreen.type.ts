/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ActionData } from '../../primitives/action-data';

interface StageScreenDone extends Pick<ActionData, 'onSelect' | 'disabled'> {
  label?: string;
}

interface StageScreenProps {
  title: ReactNode;
  icon: ReactNode;
  heading: ReactNode;
  onClose: () => void;
  children: ReactNode;
  subtitle?: ReactNode;
  toolbar?: ReactNode;
  done?: StageScreenDone;
  backdrop?: ReactNode;
  floating?: ReactNode;
  hidden?: boolean;
  className?: string;
}

export type { StageScreenDone, StageScreenProps };
