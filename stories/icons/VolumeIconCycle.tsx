/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { Flex, Text, VolumeIcon } from '../../src/primitives';
import { VOLUME_CYCLE, VOLUME_TICK_MS } from './volume-icon.constants';

const VolumeIconCycle = () => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((now) => now + 1), VOLUME_TICK_MS);
    return () => window.clearInterval(timer);
  }, []);
  const { level, muted } = VOLUME_CYCLE[tick % VOLUME_CYCLE.length] ?? { level: 0, muted: false };
  return (
    <Flex gap="md" align="center">
      <VolumeIcon level={level} muted={muted} size={32} />
      <VolumeIcon level={level} muted={muted} size={16} />
      <Text tone="dim" className="volume-icon-demo__readout">{muted ? 'Muted' : `${Math.round(level * 100)}%`}</Text>
    </Flex>
  );
};

export { VolumeIconCycle };
