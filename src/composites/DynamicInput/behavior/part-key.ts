/* @layer renderer-components @kind util */
import type { PatternPart } from './parse-pattern.type';

const partKey = (part: PatternPart, at: number): string =>
  part.kind === 'slot' ? `slot:${part.slot.name}:${part.slot.type}` : `${part.kind}:${at}`;

export { partKey };
