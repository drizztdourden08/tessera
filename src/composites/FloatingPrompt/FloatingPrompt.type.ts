/* @layer renderer-components @kind types */
import type { ButtonVariant } from '../../primitives/Button/Button.type';
import type { ToastVariant } from '../Toast/Toast.type';

type FloatingPromptScope = 'container' | 'window';

interface FloatingPromptAction {
  id: string;
  label: string;
  onSelect: () => void;
  variant?: ButtonVariant;
  cancel?: boolean;
  disabled?: boolean;
}

interface FloatingPromptProps {
  open: boolean;
  message: string;
  actions: readonly FloatingPromptAction[];
  variant?: ToastVariant;
  scope?: FloatingPromptScope;
  label?: string;
  className?: string;
}

export type { FloatingPromptAction, FloatingPromptProps, FloatingPromptScope };
