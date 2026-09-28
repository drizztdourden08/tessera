/* @layer renderer-components @kind util */
import { normalizeTarget } from './normalize-target';

const targetSet = (targets: readonly string[]): ReadonlySet<string> => new Set(targets.map(normalizeTarget));

export { targetSet };
