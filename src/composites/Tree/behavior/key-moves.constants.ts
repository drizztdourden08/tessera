/* @layer renderer-components @kind logic */
import type { KeyMoveStep, TreeKeyDirection } from './move-request.type';

const KEY_MOVES: Readonly<Record<TreeKeyDirection, KeyMoveStep>> = {
  up: (context) => {
    const before = context.others.filter((row) => row.position < context.start).length;
    return before === 0 ? undefined : context.request(context.parentKey, before - 1, false);
  },
  down: (context) => {
    const before = context.others.filter((row) => row.position < context.end).length;
    return before >= context.others.length ? undefined : context.request(context.parentKey, before + 1, false);
  },
  in: (context) => {
    const previous = context.others.filter((row) => row.position < context.start).at(-1);
    if (!previous?.branch) return undefined;
    if (context.maxDepth !== undefined && previous.depth + 1 > context.maxDepth) return undefined;
    return context.request(previous.key, context.childCount(previous.key), true);
  },
  out: (context) => {
    const parent = context.rowOf(context.parentKey);
    return parent ? context.request(parent.parentKey, parent.position, false) : undefined;
  },
};

export { KEY_MOVES };
