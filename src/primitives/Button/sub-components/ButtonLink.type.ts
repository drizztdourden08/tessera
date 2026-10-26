/* @layer renderer-components @kind types */
import type { ButtonHTMLAttributes, ForwardedRef, ReactNode } from 'react';

interface ButtonLinkProps {
  href: string;
  target: string | undefined;
  rel: string | undefined;
  download: boolean | string | undefined;
  disabled: boolean | undefined;
  loading: boolean;
  linkRef: ForwardedRef<HTMLButtonElement>;
  attributes: ButtonHTMLAttributes<HTMLButtonElement>;
  className: string | undefined;
  children: ReactNode;
}

export type { ButtonLinkProps };
