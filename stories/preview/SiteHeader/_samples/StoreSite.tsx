/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { SideNavLayout } from '../../../../src/composites';
import { Box, Paragraph } from '../../../../src/primitives';
import { SiteHeader } from '../SiteHeader';
import { AccountMenu } from './AccountMenu';
import { hookshopBrand } from './hookshop-brand';
import { SITE_TEXT, STORE_SECTIONS } from './site-samples.constants';
import type { SiteFrameProps } from './site-story.type';
import { storeNav } from './store-nav';
import { StorePage } from './StorePage';

const StoreSite = ({ phone = false }: SiteFrameProps) => {
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('dark-world');
  const config = useMemo(storeNav, []);
  const section = STORE_SECTIONS.find((entry) => entry.id === active) ?? STORE_SECTIONS[0];
  return (
    <Box className={`site-story__site${phone ? ' site-story__site--phone' : ''}`} data-palette="rotp">
      <SiteHeader brand={hookshopBrand()} navigate={() => setActive('home')} actions={<AccountMenu compact={phone} />} />
      <Box className="site-story__body">
        <SideNavLayout
          nav={{ config, activeId: active, onSelect: setActive, search: { value: query, onChange: setQuery, placeholder: SITE_TEXT.searchPlaceholder } }}
          results={<Paragraph tone="dim">{`${SITE_TEXT.results} "${query}"`}</Paragraph>}
          paneScroll="none"
        >
          {section && <StorePage section={section} selectedId={phone ? '' : selectedId} onSelect={setSelectedId} />}
        </SideNavLayout>
      </Box>
    </Box>
  );
};

export { StoreSite };
