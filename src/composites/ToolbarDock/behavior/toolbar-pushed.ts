/* @layer renderer-components @kind logic */
import { SHARE_EPSILON, TOOLBAR_SIDES } from '../ToolbarDock.constants';
import type { ToolbarLayout, ToolbarPlace } from '../ToolbarDock.type';

const toolbarPushed = (before: ToolbarLayout, after: ToolbarLayout, id: string): string[] => {
  const moved = (place: ToolbarPlace, lane: number, side: (typeof TOOLBAR_SIDES)[number]): boolean => {
    const old = before.sides[side][lane]?.find((candidate) => candidate.id === place.id);
    return place.id !== id && old !== undefined && Math.abs(old.start - place.start) > SHARE_EPSILON;
  };
  return TOOLBAR_SIDES.flatMap((side) =>
    after.sides[side].flatMap((places, lane) => places.filter((place) => moved(place, lane, side)).map((place) => place.id)));
};

export { toolbarPushed };
