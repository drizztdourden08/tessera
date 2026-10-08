/* @layer stories @kind component */
import { Box, Link } from '../../../../src/primitives';
import type { SiteHeaderLinksProps } from '../SiteHeader.type';

const SiteHeaderLinks = (props: SiteHeaderLinksProps) => {
  const { links, activeId, navigate, label } = props;
  return (
    <Box as="nav" className="site-header__links" aria-label={label}>
      {links.map((link) => (
        <Link
          key={link.id}
          href={link.href}
          navigate={navigate}
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
