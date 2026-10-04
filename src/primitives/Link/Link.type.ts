/* @layer renderer-components @kind types */
import type { AnchorHTMLAttributes, Ref } from 'react';

type LinkTone = 'primary' | 'secondary' | 'neutral' | 'danger';

type LinkVariant = 'inline' | 'subtle';

interface LinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  tone?: LinkTone;
  variant?: LinkVariant;
  external?: boolean;
  ref?: Ref<HTMLAnchorElement>;
}

export type { LinkProps, LinkTone, LinkVariant };
