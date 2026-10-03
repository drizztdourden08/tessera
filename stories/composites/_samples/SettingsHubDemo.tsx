/* @layer stories @kind component */
import { useState } from 'react';
import { NavLayout, SettingsPage } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { HUB_NAV, HUB_PAGES } from './hub';
import { useSwitches } from './hub-search';
import { HubPageBody } from './HubPageBody';
import { HubResults } from './HubResults';

const SettingsHubDemo = (props: { query?: string }) => {
  const [active, setActive] = useState('general');
  const [query, setQuery] = useState(props.query ?? '');
  const switches = useSwitches();
  const open = (id: string) => { setQuery(''); setActive(id); };
  const page = HUB_PAGES.find((p) => p.id === active);

  return (
    <Box className="story-frame search-results-story__hub">
      <NavLayout
        paneScroll="none"
        nav={{ config: HUB_NAV, activeId: active, onSelect: open, defaultOpen: true, search: { value: query, onChange: setQuery, placeholder: 'Search every setting' } }}
        results={<HubResults query={query} switches={switches} onOpen={open} />}
      >
        <SettingsPage icon={page?.icon} title={page?.label ?? active}>
          <HubPageBody id={active} switches={switches} />
        </SettingsPage>
      </NavLayout>
    </Box>
  );
};

export { SettingsHubDemo };
