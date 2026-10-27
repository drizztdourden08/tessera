/* @layer stories @kind component */
import { useState } from 'react';
import { Box, SearchInput, Select, Text } from '../../../src/primitives';
import { TOOLBAR_SORTS } from './search-toolbar.constants';

const FitSelect = () => {
  const [sort, setSort] = useState('recent');
  return (
    <Box className="story-column">
      <Select width="fit" value={sort} onChange={setSort} options={TOOLBAR_SORTS} aria-label="Sort presets" />
      <Select value={sort} onChange={setSort} options={TOOLBAR_SORTS} aria-label="Sort presets, full width" />
      <Text className="story-label">The first Select fits its content; the second fills the line.</Text>
    </Box>
  );
};

const NarrowSearch = () => {
  const [query, setQuery] = useState('');
  return (
    <Box className="story-column">
      <SearchInput width="narrow" value={query} onChange={setQuery} placeholder="Search presets" />
      <SearchInput value={query} onChange={setQuery} placeholder="Search presets, full width" />
      <Text className="story-label">The first SearchInput is 220 px wide; the second fills the line.</Text>
    </Box>
  );
};

export { FitSelect, NarrowSearch };
