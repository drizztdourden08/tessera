/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { SideNavLayout, SiteHeader } from '../../../src/composites';
import { Box, Paragraph } from '../../../src/primitives';
import { hookshopBrand } from './site-brand';
import { storeNav } from './site-nav';
import { PART } from './site-parts.constants';
import { HOOKSHOP_PROFILE } from './site-profile';
import { SITE_TEXT, STORE_SECTIONS } from './site-samples.constants';
import type { SiteFrameProps } from './site-story.type';
import { SitePartTag } from './SitePartTag';
import { SiteStorePage } from './SiteStorePage';

const SiteStore = ({ phone = false, labels = false }: SiteFrameProps) => {
  const [active, setActive] = useState('home');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState('dark-world');
  const config = useMemo(storeNav, []);
  const section = STORE_SECTIONS.find((entry) => entry.id === active) ?? STORE_SECTIONS[0];
  return (
    <Box className={`site-story__site site-story__site--tall${phone ? ' site-story__site--phone' : ''}`} data-palette="rotp">
      <SitePartTag name={PART.header} show={labels} site place="bottom-center">
        <SiteHeader brand={hookshopBrand()} navigate={() => setActive('home')} profile={HOOKSHOP_PROFILE} />
      </SitePartTag>
      <Box className="site-story__body">
        <SitePartTag name={PART.nav} show={labels} place="bottom-start" className="site-story__main">
          <SideNavLayout
            nav={{ config, activeId: active, onSelect: setActive, search: { value: query, onChange: setQuery, placeholder: SITE_TEXT.searchPlaceholder } }}
            results={<Paragraph tone="dim">{`${SITE_TEXT.results} "${query}"`}</Paragraph>}
            paneScroll="none"
          >
            {section && <SiteStorePage section={section} selectedId={phone ? '' : selectedId} onSelect={setSelectedId} labels={labels} />}
          </SideNavLayout>
        </SitePartTag>
      </Box>
    </Box>
  );
};

export { SiteStore };
