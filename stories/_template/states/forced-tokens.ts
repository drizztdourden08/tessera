/* @layer stories @kind logic */
import { FORCED_WITH } from './states.constants';
import type { PseudoState, StateEntry } from './states.type';

const forcedTokens = (pseudo: StateEntry['pseudo']): string | undefined => {
  if (pseudo === undefined) return undefined;
  const list: readonly PseudoState[] = typeof pseudo === 'string' ? [pseudo] : pseudo;
  return [...new Set(list.flatMap((name) => FORCED_WITH[name]))].join(' ');
};

export { forcedTokens };
