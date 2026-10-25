/* @layer renderer-components @kind logic */
import { TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarPlace } from '../ToolbarDock.type';
import { TOLERANCE } from './is-same-toolbar-sides.constants';

const samePlace = (a: ToolbarPlace, b: ToolbarPlace | undefined): boolean =>
  a.id === b?.id && Math.abs(a.start - b.start) < TOLERANCE && Math.abs(a.size - b.size) < TOLERANCE;

const sameLane = (a: readonly ToolbarPlace[], b: readonly ToolbarPlace[] | undefined): boolean =>
  a.length === b?.length && a.every((place, index) => samePlace(place, b[index]));

const isSameToolbarSides = (a: ToolbarLayout, b: ToolbarLayout): boolean =>
  TOOLBAR_SIDES.every((side) => a.sides[side].length === b.sides[side].length && a.sides[side].every((lane, index) => sameLane(lane, b.sides[side][index])));

export { isSameToolbarSides };
