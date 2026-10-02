/* @layer renderer-components @kind types */
import type { LinkProps } from '../Link/Link.type';

interface RouterLinkProps extends Omit<LinkProps, 'href' | 'external'> {
  to: string;
  onNavigate: (to: string) => void;
  href?: string;
}

export type { RouterLinkProps };
