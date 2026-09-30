/* @layer stories @kind component */
import { PressedGrid } from '../../../src/composites';
import { GAMEPAD_BUTTONS, PRESS_SEQUENCE } from './gamepad-buttons';
import { usePressSequence } from './use-press-sequence';

const LivePressedGrid = () => <PressedGrid items={GAMEPAD_BUTTONS} pressed={usePressSequence(PRESS_SEQUENCE)} />;

export { LivePressedGrid };
