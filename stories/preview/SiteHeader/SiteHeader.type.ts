/* @layer stories @kind types */
import type { ReactNode } from 'react';

interface SiteHeaderBrand {
  mark: ReactNode;
  name?: ReactNode;
  label: string;
  href: string;
}

interface SiteHeaderLink {
  id: string;
  label: string;
  href: string;
}

interface SiteHeaderProps {
  brand: SiteHeaderBrand;
  links?: readonly SiteHeaderLink[];
  activeId?: string;
  navigate?: (href: string) => void;
  actions?: ReactNode;
  label?: string;
  className?: string;
}

interface SiteHeaderLinksProps {
  links: readonly SiteHeaderLink[];
  activeId?: string;
  navigate?: (href: string) => void;
  label: string;
}

type SiteHeaderMenuProps = Omit<SiteHeaderLinksProps, 'label'>;

export type { SiteHeaderBrand, SiteHeaderLink, SiteHeaderLinksProps, SiteHeaderMenuProps, SiteHeaderProps };
