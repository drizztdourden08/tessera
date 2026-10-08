/* @layer renderer-components @kind util */
import type { KeyboardEvent } from 'react';

const inlineButtonProps = (inline: boolean, disabled: boolean, hint: string | undefined, onKeyDown: (e: KeyboardEvent<HTMLDivElement>) => void) =>
  (inline ? { role: 'button', tabIndex: disabled ? -1 : 0, title: hint, onKeyDown } : {});

export { inlineButtonProps };
