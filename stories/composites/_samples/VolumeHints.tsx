/* @layer stories @kind component */
import { useState } from 'react';
import { VolumeControl } from '../../../src/composites';
import { Box, HintLine, HintScope } from '../../../src/primitives';

const VolumeHints = () => {
  const [music, setMusic] = useState(70);
  const [effects, setEffects] = useState(30);
  return (
    <HintScope>
      <Box className="story-column">
        <VolumeControl label="Music" value={music} onChange={setMusic} size="sm" />
        <VolumeControl label="Effects" value={effects} onChange={setEffects} size="sm" />
        <HintLine />
      </Box>
    </HintScope>
  );
};

export { VolumeHints };
