/* @layer stories @kind component */
import { useState } from 'react';
import { AnimatedMascot } from '../../../src/brand';
import { Button, Flex, Icon, Stack, Text } from '../../../src/primitives';
import { Demonstrator } from '../../_template/Demonstrator';
import { SENTRI_ANIMATIONS, SENTRI_MOTION } from './mascot-brands.constants';

const COLUMNS = SENTRI_ANIMATIONS.map((id) => ({ key: id, label: SENTRI_MOTION?.animations[id]?.name ?? id }));

const MascotAnimations = () => {
  const [playing, setPlaying] = useState(true);
  return (
    <Stack gap="lg">
      <Flex>
        <Button variant="secondary" size="sm" icon={<Icon name={playing ? 'pause' : 'play'} />} onClick={() => setPlaying((on) => !on)}>
          {playing ? 'Pause' : 'Play'}
        </Button>
      </Flex>
      <Demonstrator
        columns={COLUMNS}
        fill
        valign="start"
        cell={(_row, id) => {
          const clip = SENTRI_MOTION?.animations[id];
          return (
            <Stack gap="sm" align="center">
              <AnimatedMascot brand="rotp" animation={id} playing={playing} loop scale={3} title={`Sentri, ${clip?.name ?? id}`} />
              <Text variant="caption">{clip?.loop ? 'Loops.' : 'Plays once; looped here.'}</Text>
              <Text variant="caption">{clip?.summary}</Text>
            </Stack>
          );
        }}
      />
    </Stack>
  );
};

export { MascotAnimations };
