/* @layer stories @kind component */
import { Box, Link, Span } from '../../../src/primitives';
import { SITE_HEADER_STRINGS } from './site-header-strings.constants';
import type { SiteHeaderProps } from './SiteHeader.type';
import { SiteHeaderLinks } from './sub-components/SiteHeaderLinks';
import { SiteHeaderMenu } from './sub-components/SiteHeaderMenu';
import './SiteHeader.css';

const SiteHeader = (props: SiteHeaderProps) => {
  const { brand, links = [], activeId, navigate, actions, label = SITE_HEADER_STRINGS.links, className } = props;
  const hasLinks = links.length > 0;
  return (
    <Box as="header" className={['site-header', className].filter(Boolean).join(' ')}>
      <Box className="site-header__bar">
        <Link href={brand.href} navigate={navigate} tone="neutral" variant="subtle" className="site-header__brand" aria-label={brand.label}>
          <Span className="site-header__mark" aria-hidden>{brand.mark}</Span>
          {brand.name !== undefined && <Span className="site-header__name" aria-hidden>{brand.name}</Span>}
        </Link>
        {hasLinks && <SiteHeaderLinks links={links} activeId={activeId} navigate={navigate} label={label} />}
        <Box className="site-header__end">
          {actions}
          {hasLinks && <SiteHeaderMenu links={links} activeId={activeId} navigate={navigate} />}
        </Box>
      </Box>
    </Box>
  );
};

export { SiteHeader };
