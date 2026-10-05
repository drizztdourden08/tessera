/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { ConfirmAskControls } from '../behavior/useConfirmAsk.type';

interface ConfirmIconButtonQuestionProps {
  className: string;
  label: string;
  question: ReactNode;
  danger: boolean;
  confirmLabel: string;
  ask: ConfirmAskControls;
}

export type { ConfirmIconButtonQuestionProps };
