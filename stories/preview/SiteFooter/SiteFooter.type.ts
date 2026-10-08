/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface SiteFooterLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

interface SiteFooterProps {
  brand?: ReactNode;
  note?: ReactNode;
  links?: readonly SiteFooterLink[];
  navigate?: (href: string) => void;
  label?: string;
  className?: string;
}

export type { SiteFooterLink, SiteFooterProps };
