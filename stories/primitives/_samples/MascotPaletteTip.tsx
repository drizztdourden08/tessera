/* @layer stories @kind component */
import { useMemo, useState } from 'react';
import { AnimatedMascot } from '../../../src/brand';
import { CommandPalette } from '../../../src/composites';
import { Box, SpeechBubble } from '../../../src/primitives';
import { paletteGroups } from '../../composites/_samples/palette';
import { BUBBLE_WIDTH, NO_FLAGS, TIP } from './mascot-palette-tip.constants';

const ignore = () => undefined;

const MascotPaletteTip = () => {
  const [query, setQuery] = useState('');
  const groups = useMemo(() => paletteGroups(query, NO_FLAGS, ignore, ignore), [query]);

  return (
    <Box className="story-frame speech-bubble-story__frame">
      <CommandPalette open onClose={ignore} query={query} onQueryChange={setQuery} groups={groups} onSelect={ignore} />
      <Box className="speech-bubble-story__guide">
        <SpeechBubble tone="primary" pointer="bottom" pointerOffset={BUBBLE_WIDTH / 2} maxWidth={BUBBLE_WIDTH} role="status">{TIP}</SpeechBubble>
        <AnimatedMascot brand="rotp" animation="idle" face="left" scale={4} />
      </Box>
    </Box>
  );
};

export { MascotPaletteTip };
