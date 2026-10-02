/* @layer stories @kind component */
import { useState } from 'react';
import { NavLayout, SearchResults, SettingsGroupList, SettingsPage } from '../../../src/composites';
import { Box, Paragraph } from '../../../src/primitives';
import { HUB_NAV, HUB_PAGES } from './hub';
import { countOf, hubGroups, hubJumps, sectionsOf, settingsOf, settingsSummary, useSwitches } from './hub-search';
import type { Switches } from './hub-search';

const HubSettingsPage = (props: { id: string; switches: Switches }) => {
  const { id, switches } = props;
  const page = HUB_PAGES.find((p) => p.id === id);
  const rows = settingsOf(id);
  return (
    <SettingsPage icon={page?.icon} title={page?.label ?? id}>
      {rows.length > 0
        ? <SettingsGroupList sections={sectionsOf(rows, switches)} />
        : <Paragraph tone="muted">This page has no settings. Search for tray, players or session.</Paragraph>}
    </SettingsPage>
  );
};

const SettingsHubDemo = (props: { query?: string }) => {
  const [active, setActive] = useState('general');
  const [query, setQuery] = useState(props.query ?? '');
  const switches = useSwitches();
  const groups = hubGroups(query, switches);
  const count = countOf(groups);
  const open = (id: string) => { setQuery(''); setActive(id); };

  return (
    <Box className="story-frame search-results-story__hub">
      <NavLayout
        paneScroll="none"
        nav={{ config: HUB_NAV, activeId: active, onSelect: open, defaultOpen: true, search: { value: query, onChange: setQuery, placeholder: 'Search every setting' } }}
        results={(
          <SearchResults
            framed
            query={query}
            count={count}
            summary={settingsSummary(count, query)}
            jumps={hubJumps(query)}
            onJump={open}
            groups={groups}
            onOpenGroup={open}
            openLabel="Open tab"
            idleMessage="Type to search every setting, on every tab."
            emptyMessage="Try a shorter word, or the name of what the setting changes."
          />
        )}
      >
        <HubSettingsPage id={active} switches={switches} />
      </NavLayout>
    </Box>
  );
};

export { SettingsHubDemo };
