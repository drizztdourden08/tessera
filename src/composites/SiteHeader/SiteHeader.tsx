/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Link } from '../../primitives/Link';
import { Span } from '../../primitives/text-elements';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { TitleBarAction } from '../WindowTitleBar/sub-components/TitleBarAction';
import type { SiteHeaderProps } from './SiteHeader.type';
import { SiteHeaderLinks } from './sub-components/SiteHeaderLinks';
import { SiteHeaderMenu } from './sub-components/SiteHeaderMenu';
import './SiteHeader.css';

const ignore = (): void => undefined;

const SiteHeader = (props: SiteHeaderProps) => {
  const { brand, links = [], activeId, navigate, profile, actions, label, className } = props;
  const { navigation } = useTesseraStrings();
  const hasLinks = links.length > 0;
  return (
    <Box as="header" className={['site-header', className].filter(Boolean).join(' ')}>
      <Box className="site-header__bar">
        <Link href={brand.href} navigate={navigate} tone="neutral" variant="subtle" className="site-header__brand" aria-label={brand.label}>
          <Span className="site-header__logo" aria-hidden>{brand.logo}</Span>
          {brand.title !== undefined && <Span className="site-header__title" aria-hidden>{brand.title}</Span>}
        </Link>
        {hasLinks && <SiteHeaderLinks links={links} activeId={activeId} navigate={navigate} label={label ?? navigation.siteLinks} />}
        <Box className="site-header__end">
          {actions}
          {profile && <TitleBarAction action={profile} away={false} onMenuOpenChange={ignore} />}
          {hasLinks && <SiteHeaderMenu links={links} activeId={activeId} navigate={navigate} />}
        </Box>
      </Box>
    </Box>
  );
};

export { SiteHeader };
