/* @layer renderer-components @kind logic */
import type { ToolbarPlace } from '../ToolbarDock.type';
import { FIT_EPSILON } from './toolbar-corner-fit.constants';
import type { ToolbarRun } from './toolbar-corner-fit.type';

const pushedForward = (runs: ToolbarRun[], room: number): ToolbarRun[] | null => {
  let cursor = 0;
  const out = runs.map((run) => {
    const from = Math.max(run.from, cursor);
    cursor = from + run.length;
    return { ...run, from };
  });
  return cursor > room + FIT_EPSILON ? null : out;
};

const pushedBackward = (runs: ToolbarRun[], room: number): ToolbarRun[] | null => {
  let cursor = room;
  const out = [...runs].reverse().map((run) => {
    const to = Math.min(run.from + run.length, cursor);
    cursor = to - run.length;
    return { ...run, from: cursor };
  }).reverse();
  return cursor < -FIT_EPSILON ? null : out;
};

const shrunk = (runs: ToolbarRun[], room: number, atStart: boolean): ToolbarRun[] | null =>
  (atStart ? pushedForward(runs, room) : pushedBackward(runs, room));

const toolbarCornerFit = (places: readonly ToolbarPlace[], span: number, delta: number, atStart: boolean): ToolbarPlace[] | null => {
  const room = span + delta;
  if (!(room > 0)) return null;
  const shift = atStart ? delta : 0;
  const runs = places.map((place) => ({ id: place.id, from: place.start * span + shift, length: place.size * span }));
  const fitted = delta >= 0 ? runs : shrunk(runs, room, atStart);
  return fitted?.map((run) => ({ id: run.id, start: run.from / room, size: run.length / room })) ?? null;
};

export { toolbarCornerFit };
