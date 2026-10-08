/* @layer stories @kind component */
import { useState } from 'react';
import { Logo } from '../../../src/brand';
import { SiteFooter, SiteHeader } from '../../../src/composites';
import { Box, Card } from '../../../src/primitives';
import { hookshopBrand } from './site-brand';
import { SiteSignInButton } from './SiteSignInButton';
import { FOOTER_LINKS, PUBLIC_LINKS, SITE_TEXT } from './site-samples.constants';
import type { SiteFrameProps } from './site-story.type';
import { SiteStoreItems } from './SiteStoreItems';

const SitePublicPage = ({ phone = false }: SiteFrameProps) => {
  const [active, setActive] = useState('browse');
  return (
    <Box className={`site-story__site${phone ? ' site-story__site--phone' : ''}`} data-palette="rotp">
      <SiteHeader brand={hookshopBrand()} links={PUBLIC_LINKS} activeId={active} navigate={(href) => setActive(href.slice(1))} actions={<SiteSignInButton />} />
      <Box className="site-story__center">
        <Card title={SITE_TEXT.popular} subtitle={SITE_TEXT.welcome} className="site-story__public">
          <SiteStoreItems />
        </Card>
      </Box>
      <SiteFooter logo={<Logo brand="rotp" size="sm" />} note={SITE_TEXT.footerNote} links={FOOTER_LINKS} navigate={() => undefined} />
    </Box>
  );
};

export { SitePublicPage };
