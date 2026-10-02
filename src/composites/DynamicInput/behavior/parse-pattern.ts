/* @layer renderer-components @kind logic */
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import { readToken } from './read-token';
import { scanPattern } from './scan-pattern';
import type { ParsedPattern, ParseState, PatternPart } from './parse-pattern.type';

const mergeLiterals = (parts: readonly PatternPart[]): PatternPart[] =>
  parts.reduce<PatternPart[]>((merged, part) => {
    const last = merged[merged.length - 1];
    if (part.kind === 'literal' && last?.kind === 'literal') {
      merged[merged.length - 1] = { kind: 'literal', text: `${last.text}${part.text}` };
      return merged;
    }
    merged.push(part);
    return merged;
  }, []);

const dropLostEchoes = (state: ParseState): PatternPart[] => {
  const names = new Set(state.slots.map((slot) => slot.name));
  return state.parts.filter((part) => {
    if (part.kind !== 'echo' || names.has(part.name)) return true;
    state.problems.push(PATTERN_PROBLEMS.echoTarget(part.name));
    return false;
  });
};

const parsePattern = (pattern: string): ParsedPattern => {
  const scan = scanPattern(pattern);
  const state: ParseState = { parts: [], slots: [], problems: [...scan.problems] };
  for (const token of scan.tokens) readToken(state, token);
  const parts = mergeLiterals(dropLostEchoes(state));
  return { parts, slots: state.slots, problems: state.problems };
};

export { parsePattern };
