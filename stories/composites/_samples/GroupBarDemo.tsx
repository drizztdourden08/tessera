/* @layer stories @kind component */
import { useState } from 'react';
import { FilterBar, GroupBar } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import { PLAYER_SCHEMA } from './data-players';
import type { GroupBarDemoProps } from './GroupBarDemo.type';

const GROUP_FIELDS = [
  { id: 'game', label: 'Game' },
  { id: 'status', label: 'Status' },
  { id: 'owner', label: 'Owner' },
];

const NO_LEVELS: readonly string[] = [];

const GroupBarDemo = ({ maxLevels, startWith = NO_LEVELS, beside = false }: GroupBarDemoProps) => {
  const [levels, setLevels] = useState<string[]>([...startWith]);
  const [search, setSearch] = useState('');
  const bar = <GroupBar key="group" options={GROUP_FIELDS} value={levels} onChange={setLevels} maxLevels={maxLevels} />;

  return (
    <Box className="story-column">
      {beside ? (
        <FilterBar
          search={search}
          onSearchChange={setSearch}
          searchLabel="Search players"
          schema={PLAYER_SCHEMA}
          clauses={[]}
          onChange={() => undefined}
          extra={[bar]}
        />
      ) : (
        bar
      )}
    </Box>
  );
};

export { GroupBarDemo };
