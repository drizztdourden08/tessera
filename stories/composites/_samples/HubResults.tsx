/* @layer stories @kind component */
import { SearchResults } from '../../../src/composites';
import { countOf, hubGroups, hubJumps, settingsSummary } from './hub-search';
import type { Switches } from './hub-search';

const HubResults = (props: { query: string; switches: Switches; onOpen: (id: string) => void }) => {
  const { query, switches, onOpen } = props;
  const groups = hubGroups(query, switches);
  const count = countOf(groups);
  return (
    <SearchResults
      framed
      query={query}
      count={count}
      summary={settingsSummary(count, query)}
      jumps={hubJumps(query)}
      onJump={onOpen}
      groups={groups}
      onOpenGroup={onOpen}
      openLabel="Open tab"
      idleMessage="Type to search every setting, on every tab."
      emptyMessage="Try a shorter word, or the name of what the setting changes."
    />
  );
};

export { HubResults };
