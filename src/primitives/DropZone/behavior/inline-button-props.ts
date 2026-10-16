/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const inlineButtonProps = (inline: boolean, disabled: boolean, hint: string | undefined, onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void) =>
  (inline ? { role: 'button', tabIndex: disabled ? undefined : 0, title: disabled ? undefined : hint, 'aria-disabled': disabled || undefined, onKeyDown } : {});

export { inlineButtonProps };
