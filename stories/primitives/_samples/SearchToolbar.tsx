/* @layer stories @kind component */
import { useState } from 'react';
import { matchesText } from '../../../src/data';
import { Icon, IconButton, SearchInput, SegmentedControl, Select, Text, ToolFrame, ToolGroups } from '../../../src/primitives';
import { TOOLBAR_PRESETS, TOOLBAR_SORTS } from './search-toolbar.constants';

const SearchToolbar = () => {
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('recent');
  const [view, setView] = useState('list');
  const shown = TOOLBAR_PRESETS.filter((name) => matchesText(name, query));
  const sorted = sort === 'name' ? [...shown].sort() : shown;

  const tools = (
    <ToolGroups
      groups={[
        { id: 'find', label: 'Find', content: <SearchInput size="sm" grow={false} value={query} onChange={setQuery} placeholder="Search game presets" /> },
        { id: 'sort', label: 'Sort', content: <Select size="sm" grow={false} value={sort} onChange={setSort} options={TOOLBAR_SORTS} aria-label="Sort presets" /> },
        { id: 'view', label: 'View', content: <SegmentedControl size="sm" value={view} onChange={setView} options={[{ value: 'list', label: 'List' }, { value: 'grid', label: 'Grid' }]} /> },
        { id: 'add', label: 'Add', content: <IconButton size="sm" variant="ghost" label="New preset"><Icon name="plus" /></IconButton> },
      ]}
    />
  );

  return (
    <ToolFrame as="section" aria-label="Game presets" padded toolbar={tools} className="search-story__frame">
      {sorted.map((name) => <Text key={name}>{name}</Text>)}
      {sorted.length === 0 && <Text tone="muted">No preset matches</Text>}
    </ToolFrame>
  );
};

export { SearchToolbar };
