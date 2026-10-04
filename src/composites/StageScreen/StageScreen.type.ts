/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface StageScreenDone {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
}

interface StageScreenProps {
  title: ReactNode;
  onClose: () => void;
  children: ReactNode;
  subtitle?: ReactNode;
  toolbar?: ReactNode;
  done?: StageScreenDone;
  floating?: ReactNode;
  hidden?: boolean;
  className?: string;
}

interface StageBarProps {
  toolbar?: ReactNode;
  done?: StageScreenDone;
}

export type { StageBarProps, StageScreenDone, StageScreenProps };
