/* @layer renderer-components @kind types */
import type { KeyboardEvent, ReactNode } from 'react';

interface ComposerProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (value: string) => void;
  placeholder?: string;
  maxRows?: number;
  disabled?: boolean;
  sendSlot?: ReactNode;
  bar?: ReactNode;
  className?: string;
  'aria-label'?: string;
}

interface ComposerKeysInput {
  value: string;
  disabled: boolean;
  onSubmit: (value: string) => void;
}

type ComposerKeyEvent = Pick<KeyboardEvent<HTMLTextAreaElement>, 'key' | 'shiftKey' | 'ctrlKey' | 'metaKey' | 'altKey' | 'defaultPrevented'>;

interface ComposerSendProps {
  value: string;
  disabled: boolean;
  onSubmit: (value: string) => void;
}

export type {
  ComposerKeyEvent,
  ComposerKeysInput,
  ComposerProps,
  ComposerSendProps,
};
