/* @layer renderer-components @kind logic */
import { slotWidth } from './slot-width';
import type { PatternChoice, PatternValue } from '../DynamicInput.type';
import type { PasteCut, PasteScan, PasteStep } from './split-pasted.type';

const BLANK = /\s+/g;

const skipBlank = (text: string, at: number): number => {
  let next = at;
  while (next < text.length && /\s/.test(text.charAt(next))) next += 1;
  return next;
};

const separatorEnds = (text: string, sep: string, from: number): PasteCut[] => {
  const cuts: PasteCut[] = [];
  const lower = text.toLowerCase();
  for (let at = lower.indexOf(sep, from); at >= 0; at = lower.indexOf(sep, at + 1)) cuts.push({ end: at, next: skipBlank(text, at + sep.length) });
  return cuts;
};

const blankEnds = (text: string, from: number): PasteCut[] =>
  [...text.slice(from).matchAll(BLANK)].map((match) => ({ end: from + match.index, next: from + match.index + match[0].length }));

const widthEnds = (scan: PasteScan, step: PasteStep, from: number): PasteCut[] => {
  const room = scan.text.length - from;
  const widest = Math.min(slotWidth(step.slot, scan.text.charAt(from)), room);
  const cuts: PasteCut[] = [];
  for (let width = widest; width >= (step.slot.optional === true ? 0 : 1); width -= 1) cuts.push({ end: from + width, next: from + width });
  return cuts;
};

const choiceEnds = (scan: PasteScan, options: readonly PatternChoice[], from: number): PasteCut[] => {
  const rest = scan.text.slice(from).toLowerCase();
  const names = options.flatMap((option) => [option.value, option.label ?? option.value].map((name) => name.toLowerCase()));
  const sizes = [...new Set(names.filter((name) => rest.startsWith(name)).map((name) => name.length))].sort((a, b) => b - a);
  return sizes.map((size) => ({ end: from + size, next: from + size }));
};

const pasteEnds = (scan: PasteScan, step: PasteStep, from: number, assigned: PatternValue): PasteCut[] => {
  const last = scan.steps.at(-1) === step;
  if (last) return [{ end: scan.text.length, next: scan.text.length }];
  const sep = step.sep.trim();
  if (sep !== '') return separatorEnds(scan.text, sep, from);
  if (step.sep !== '') return blankEnds(scan.text, from);
  return step.slot.type === 'choice' ? choiceEnds(scan, scan.choices(step.slot, assigned), from) : widthEnds(scan, step, from);
};

export { pasteEnds };
