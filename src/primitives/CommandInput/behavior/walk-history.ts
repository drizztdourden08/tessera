/* @layer renderer-components @kind logic */
import type { HistoryStep, HistoryWalk } from '../CommandInput.type';

const older = (history: readonly string[], walk: HistoryWalk, current: string): HistoryStep | null => {
  if (history.length === 0) return null;
  if (walk.index === null) {
    const index = history.length - 1;
    return { walk: { index, draft: current }, value: history[index] ?? '' };
  }
  const index = Math.max(0, Math.min(walk.index, history.length) - 1);
  return { walk: { ...walk, index }, value: history[index] ?? '' };
};

const newer = (history: readonly string[], walk: HistoryWalk): HistoryStep | null => {
  if (walk.index === null) return null;
  const index = walk.index + 1;
  if (index >= history.length) return { walk: { index: null, draft: '' }, value: walk.draft };
  return { walk: { ...walk, index }, value: history[index] ?? '' };
};

const walkHistory = (
  direction: 'older' | 'newer',
  history: readonly string[],
  walk: HistoryWalk,
  current: string,
): HistoryStep | null => (direction === 'older' ? older(history, walk, current) : newer(history, walk));

export { walkHistory };
