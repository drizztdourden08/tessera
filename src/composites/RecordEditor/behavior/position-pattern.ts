/* @layer renderer-components @kind util */
import { escapePatternText } from '../../PatternInput';
import { axisSlot } from './axis-slot';
import { AXIS_GAP, AXIS_KEYS } from './position-pattern.constants';
import type { NumberBounds } from '../../field-kits/registry.type';
import type { PositionPair } from '../RecordEditor.type';

const positionPattern = (pair: PositionPair, xBounds: NumberBounds | undefined, yBounds: NumberBounds | undefined): string => [
  `${escapePatternText(pair.x.label)} ${axisSlot(AXIS_KEYS.x, pair.x.label, xBounds)}`,
  `${escapePatternText(pair.y.label)} ${axisSlot(AXIS_KEYS.y, pair.y.label, yBounds)}`,
].join(AXIS_GAP);

export { positionPattern };
