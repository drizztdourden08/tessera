/* @layer stories @kind component */
import { useState } from 'react';
import { VolumeControl } from '../../../src/composites';
import { Flex } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

const VolumePopovers = () => {
  const [music, setMusic] = useState(60);
  const [muted, setMuted] = useState(false);
  const [effects, setEffects] = useState(30);
  return (
    <Flex gap="xl" align="start" wrap>
      <ValueReadout value={`${music}, muted ${String(muted)}`}>
        <VolumeControl slider="popover" value={music} onChange={setMusic} muted={muted} onMutedChange={setMuted} label="Music" />
      </ValueReadout>
      <ValueReadout value={effects}>
        <VolumeControl slider="popover" orientation="horizontal" value={effects} onChange={setEffects} label="Effects" />
      </ValueReadout>
    </Flex>
  );
};

export { VolumePopovers };
