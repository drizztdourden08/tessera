/* @layer renderer-components @kind logic */
import { PATTERN_PROBLEMS } from './pattern-problems.constants';
import { readBracket } from './read-bracket';
import { readEcho } from './read-echo';
import { readSlot } from './read-slot';
import type { ParseState } from './parse-pattern.type';
import type { RawToken } from './scan-pattern.type';

const addBrace = (state: ParseState, body: string): void => {
  const raw = `{${body}}`;
  if (body.trimStart().startsWith('=')) {
    const echo = readEcho(body);
    if (echo === null) state.problems.push(PATTERN_PROBLEMS.badEcho(body));
    state.parts.push(echo ?? { kind: 'literal', text: raw });
    return;
  }
  const read = readSlot(body);
  state.problems.push(...read.problems);
  const { slot } = read;
  if (slot !== null && state.slots.some((known) => known.name === slot.name)) {
    state.problems.push(PATTERN_PROBLEMS.duplicate(slot.name));
    state.parts.push({ kind: 'literal', text: raw });
    return;
  }
  if (slot === null) {
    state.parts.push({ kind: 'literal', text: raw });
    return;
  }
  state.parts.push({ kind: 'slot', slot, index: state.slots.length });
  state.slots.push(slot);
};

const addBracket = (state: ParseState, body: string): void => {
  const part = readBracket(body);
  if (part === null) state.problems.push(PATTERN_PROBLEMS.badBracket(body));
  state.parts.push(part ?? { kind: 'literal', text: `[${body}]` });
};

const readToken = (state: ParseState, token: RawToken): void => {
  if (token.kind === 'text') state.parts.push({ kind: 'literal', text: token.body });
  else if (token.kind === 'brace') addBrace(state, token.body);
  else addBracket(state, token.body);
};

export { readToken };
