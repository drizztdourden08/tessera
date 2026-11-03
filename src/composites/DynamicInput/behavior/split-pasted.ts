/* @layer renderer-components @kind logic */
import { hasSeparator } from './has-separator';
import { matchSteps } from './match-steps';
import { pasteShape } from './paste-shape';
import { trimPasted } from './trim-pasted';
import type { ParsedPattern } from './parse-pattern.type';
import type { PatternValue } from '../DynamicInput.type';
import type { PasteChoices } from './split-pasted.type';

const splitPasted = (parsed: ParsedPattern, text: string, choices: PasteChoices): PatternValue | undefined => {
  const shape = pasteShape(parsed);
  const body = trimPasted(shape, text);
  if (shape.steps.length < 2 || body === '') return undefined;
  const marked = matchSteps({ text: body, steps: shape.steps, choices }, 0, 0, {});
  if (marked !== undefined || hasSeparator(shape, body)) return marked;
  const bare = shape.steps.map((step) => ({ ...step, sep: '' }));
  return matchSteps({ text: body.replace(/\s/g, ''), steps: bare, choices }, 0, 0, {});
};

export { splitPasted };
