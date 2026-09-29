/* @layer stories @kind logic */
import { FORCE_ATTRIBUTE } from './states.constants';
import { forcedTokens } from './forced-tokens';
import type { StateEntry } from './states.type';

const forceAttributes = (pseudo: StateEntry['pseudo']): Record<string, string | undefined> => {
  const tokens = forcedTokens(pseudo);
  return tokens === undefined ? {} : { [FORCE_ATTRIBUTE]: tokens };
};

export { forceAttributes };
