/* @layer renderer-components @kind logic */
import { findGroupEnd } from './find-group-end';
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import { ESCAPE, GROUP_CLOSERS, STRAY_CLOSERS } from './scan-pattern.constants';
import type { ScanResult, ScanState } from './scan-pattern.type';

const pushText = (state: ScanState, chars: string, at: number): void => {
  if (state.text === '') state.textAt = at;
  state.text += chars;
};

const flushText = (state: ScanState): void => {
  if (state.text !== '') state.tokens.push({ kind: 'text', body: state.text, at: state.textAt });
  state.text = '';
};

const scanGroup = (state: ScanState, pattern: string, at: number): number | null => {
  const open = pattern[at] ?? '';
  const closer = GROUP_CLOSERS.get(open);
  if (closer === undefined) return null;
  const end = findGroupEnd(pattern, at, closer);
  if (end === null) {
    state.problems.push(PATTERN_PROBLEMS.unclosed(open, closer, at));
    return null;
  }
  flushText(state);
  state.tokens.push({ kind: open === '{' ? 'brace' : 'bracket', body: end.body, at });
  return end.close + 1;
};

const scanChar = (state: ScanState, pattern: string, at: number): number => {
  const char = pattern[at] ?? '';
  if (char === ESCAPE) {
    pushText(state, pattern[at + 1] ?? '', at);
    return at + 2;
  }
  const next = scanGroup(state, pattern, at);
  if (next !== null) return next;
  if (STRAY_CLOSERS.has(char)) state.problems.push(PATTERN_PROBLEMS.stray(char, at));
  pushText(state, char, at);
  return at + 1;
};

const scanPattern = (pattern: string): ScanResult => {
  const state: ScanState = { tokens: [], problems: [], text: '', textAt: 0 };
  let at = 0;
  while (at < pattern.length) at = scanChar(state, pattern, at);
  flushText(state);
  return { tokens: state.tokens, problems: state.problems };
};

export { scanPattern };
