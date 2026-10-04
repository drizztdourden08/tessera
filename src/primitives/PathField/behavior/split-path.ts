/* @layer renderer-components @kind logic */
import { SEPARATORS, TAIL_MIN } from '../PathField.constants';

const splitPath = (path: string): { head: string; tail: string } => {
  const cuts = [...path.matchAll(SEPARATORS)].map((match) => match.index).filter((index) => index > 0);
  const cut = [...cuts].reverse().find((index) => path.length - index >= TAIL_MIN) ?? cuts[0];
  if (cut === undefined) return { head: path, tail: '' };
  return { head: path.slice(0, cut), tail: path.slice(cut) };
};

export { splitPath };
