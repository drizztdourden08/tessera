/* @layer stories @kind story */
import { useState } from 'react';
import { matchesText } from '../../../src/data';
import { Box, SearchInput, Text, type ControlSize } from '../../../src/primitives';

const PRESETS = ['Casual seed', 'Keysanity', 'Swordless', 'Open mode', 'Inverted world', 'Boss shuffle', 'Enemizer', 'Retro bow'];

const StatefulSearch = (props: { initial?: string; size?: ControlSize; disabled?: boolean; placeholder?: string }) => {
  const { initial = '', size, disabled, placeholder } = props;
  const [query, setQuery] = useState(initial);
  return <SearchInput value={query} onChange={setQuery} size={size} disabled={disabled} placeholder={placeholder} />;
};

const PresetFilter = () => {
  const [query, setQuery] = useState('');
  const shown = PRESETS.filter((name) => matchesText(name, query));
  return (
    <Box className="story-column">
      <SearchInput value={query} onChange={setQuery} placeholder="Search game presets" />
      <Text className="story-label">{shown.length} of {PRESETS.length}: {shown.join(', ') || 'no match'}</Text>
    </Box>
  );
};

export { PresetFilter, StatefulSearch };
