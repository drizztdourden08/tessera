/* @layer renderer-components @kind types */
import type { AnchorHTMLAttributes, Ref } from 'react';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  ref?: Ref<HTMLAnchorElement>;
}

export type { LinkProps };
