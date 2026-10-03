/* @layer stories @kind component */
import { PressedGrid } from '../../../src/composites';
import type { InputIconFamily } from '../../../src/primitives';
import { GAMEPAD_IDS, PRESS_SEQUENCE } from './gamepad-buttons';
import { usePressSequence } from './use-press-sequence';

const LivePressedGrid = (props: { family: InputIconFamily }) => (
  <PressedGrid items={GAMEPAD_IDS} family={props.family} pressed={usePressSequence(PRESS_SEQUENCE)} />
);

export { LivePressedGrid };
