/* @layer renderer-components @kind logic */
import type { ParsedPattern, PatternPart } from './parse-pattern.type';
import type { PasteShape, PasteStep } from './split-pasted.type';

const literalOf = (part: PatternPart): string => (part.kind === 'literal' ? part.text.toLowerCase() : '');

const pasteShape = (parsed: ParsedPattern): PasteShape => {
  let lead = '';
  const steps: PasteStep[] = [];
  for (const part of parsed.parts) {
    const last = steps.at(-1);
    if (part.kind === 'slot') steps.push({ slot: part.slot, sep: '' });
    else if (last === undefined) lead += literalOf(part);
    else steps[steps.length - 1] = { ...last, sep: last.sep + literalOf(part) };
  }
  return { lead: lead.trim(), steps };
};

export { pasteShape };
