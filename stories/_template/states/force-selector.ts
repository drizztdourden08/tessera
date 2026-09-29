/* @layer stories @kind logic */
import { FORCE_ATTRIBUTE, FORCEABLE_PSEUDO, HELD_BY_ANCESTORS } from './states.constants';

const forcedMatch = (pseudo: string): string => {
  const name = pseudo.slice(1);
  const marked = `[${FORCE_ATTRIBUTE}~="${name}"]`;
  return HELD_BY_ANCESTORS.includes(name) ? `:is(${pseudo}, ${marked}, :has(${marked}))` : `:is(${pseudo}, ${marked})`;
};

const forceSelector = (selector: string): string =>
  selector.includes(FORCE_ATTRIBUTE) ? selector : selector.replace(FORCEABLE_PSEUDO, forcedMatch);

export { forceSelector };
