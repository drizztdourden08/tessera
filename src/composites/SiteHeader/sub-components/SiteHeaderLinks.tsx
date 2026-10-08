/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Link } from '../../../primitives/Link';
import type { SiteHeaderLinksProps } from './SiteHeaderLinks.type';

const SiteHeaderLinks = (props: SiteHeaderLinksProps) => {
  const { links, activeId, navigate, label } = props;
  return (
    <Box as="nav" className="site-header__links" aria-label={label}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          navigate={navigate}
          external={link.external}
          tone="neutral"
          variant="subtle"
          className="site-header__link"
          aria-current={link.id === activeId ? 'page' : undefined}
        >
          {link.label}
        </Link>
      ))}
    </Box>
  );
};

export { SiteHeaderLinks };
