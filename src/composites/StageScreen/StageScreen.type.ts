/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface StageScreenDone {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
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
