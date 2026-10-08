/* @layer renderer-components @kind types */
import type { SiteLink } from '../SiteHeader.type';

interface SiteHeaderLinksProps {
  links: readonly SiteLink[];
  activeId?: string;
  navigate?: (href: string) => void;
  label: string;
}

type SiteHeaderMenuProps = Omit<SiteHeaderLinksProps, 'label'>;

export type { SiteHeaderLinksProps, SiteHeaderMenuProps };
