/* @layer stories @kind component */
import { useState } from 'react';
import { AnimatedMascot } from '../../../src/brand';
import type { AnimatedMascotBrand, MascotClip, MascotFacing } from '../../../src/brand';
import { Box, Button, Flex, SegmentedControl, Stack, Text } from '../../../src/primitives';
import { clipLabel } from './clip-label';

interface MascotStatesProps {
  brand: AnimatedMascotBrand;
}

const STATES: readonly MascotClip[] = ['idle', 'move', 'jump', 'spin', 'wave', 'alert', 'curious', 'happy', 'working', 'sleep'];

const FACES: { value: MascotFacing; label: string }[] = [{ value: 'right', label: 'Faces right' }, { value: 'left', label: 'Faces left' }];

const MascotStates = (props: MascotStatesProps) => {
  const { brand } = props;
  const [state, setState] = useState<MascotClip>('idle');
  const [face, setFace] = useState<MascotFacing>('right');
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        {STATES.map((clip) => (
          <Button key={clip} size="sm" variant={clip === state ? 'primary' : 'secondary'} onClick={() => setState(clip)}>{clipLabel(clip)}</Button>
        ))}
        <SegmentedControl aria-label="Facing" size="sm" value={face} options={FACES} onChange={setFace} />
      </Flex>
      <Box data-testid="mascot-states">
        <AnimatedMascot brand={brand} animation={state} face={face} scale={5} onFinish={() => setState('idle')} />
      </Box>
      <Text variant="caption">
        Pick a state at any moment, even in the middle of a clip: the mascot blends from where it is. A jump or a spin finishes its leap first, an alert cuts in at once, and symbols such as the question mark fade in and out. A clip that plays once goes back to idle and calls onFinish, which sets this page back to Idle.
      </Text>
    </Stack>
  );
};

export { MascotStates };
