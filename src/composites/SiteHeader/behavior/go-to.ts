/* @layer renderer-components @kind logic */
import type { SiteLink } from '../SiteHeader.type';

const goTo = (link: SiteLink, navigate?: (href: string) => void): void => {
  if (link.external) window.open(link.href, '_blank', 'noopener');
  else if (navigate) navigate(link.href);
  else window.location.assign(link.href);
};

export { goTo };
