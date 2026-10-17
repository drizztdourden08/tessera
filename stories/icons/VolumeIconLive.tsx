/* @layer stories @kind component */
import { useState } from 'react';
import { Checkbox, Flex, Slider, VolumeIcon } from '../../src/primitives';

const VolumeIconLive = () => {
  const [level, setLevel] = useState(60);
  const [muted, setMuted] = useState(false);
  return (
    <Flex gap="lg" align="center" wrap>
      <VolumeIcon level={level / 100} muted={muted} size={32} />
      <Slider className="volume-icon-demo__slider" value={level} onChange={setLevel} aria-label="Level" formatValue={(value) => `${value}%`} />
      <Checkbox label="Muted" checked={muted} onChange={setMuted} />
    </Flex>
  );
};

export { VolumeIconLive };
