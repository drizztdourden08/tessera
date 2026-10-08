/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WindowTitleBarDropdownAction } from '../WindowTitleBar/WindowTitleBar.type';

interface SiteHeaderBrand {
  logo: ReactNode;
  title?: ReactNode;
  label: string;
  href: string;
}

interface SiteLink {
  id: string;
  label: string;
  href: string;
  external?: boolean;
}

interface SiteHeaderProps {
  brand: SiteHeaderBrand;
  links?: readonly SiteLink[];
  activeId?: string;
  navigate?: (href: string) => void;
  profile?: WindowTitleBarDropdownAction;
  actions?: ReactNode;
  label?: string;
  className?: string;
}

export type { SiteHeaderBrand, SiteHeaderProps, SiteLink };
