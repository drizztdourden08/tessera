/* @layer renderer-components @kind logic */
import { EMPHASIS_DEFAULTS } from '../Emphasis.constants';
import type { EmphasisProps, ResolvedEmphasis } from '../Emphasis.type';

const resolveEmphasis = (props: EmphasisProps): ResolvedEmphasis => {
  const keys = Object.keys(EMPHASIS_DEFAULTS) as (keyof ResolvedEmphasis)[];
  const given = Object.fromEntries(keys.flatMap((key) => (props[key] === undefined ? [] : [[key, props[key]]])));
  return { ...EMPHASIS_DEFAULTS, ...given };
};

export { resolveEmphasis };
