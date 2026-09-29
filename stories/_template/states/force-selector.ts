/* @layer stories @kind logic */
import { FORCE_ATTRIBUTE, FORCEABLE_PSEUDO } from './states.constants';

const forcedMatch = (pseudo: string): string => {
  const container = `[${FORCE_ATTRIBUTE}~="${pseudo.slice(1)}"]`;
  return `:is(${pseudo}, ${container}, ${container} *)`;
};

const forceSelector = (selector: string): string =>
  selector.includes(FORCE_ATTRIBUTE) ? selector : selector.replace(FORCEABLE_PSEUDO, forcedMatch);

export { forceSelector };
