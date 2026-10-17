/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ReactNode, Ref } from 'react';

interface EdgeButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string;
  children: ReactNode;
  ref?: Ref<HTMLButtonElement>;
}

export type { EdgeButtonProps };
