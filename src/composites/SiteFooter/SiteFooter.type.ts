/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { SiteLink } from '../SiteHeader/SiteHeader.type';

interface SiteFooterProps {
  logo?: ReactNode;
  note?: ReactNode;
  links?: readonly SiteLink[];
  navigate?: (href: string) => void;
  label?: string;
  className?: string;
}

export type { SiteFooterProps };
