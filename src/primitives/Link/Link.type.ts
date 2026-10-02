/* @layer renderer-components @kind types */
import type { AnchorHTMLAttributes, Ref } from 'react';

type LinkTone = 'primary' | 'secondary' | 'neutral' | 'danger';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tone?: LinkTone;
  external?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export type { LinkProps, LinkTone };
