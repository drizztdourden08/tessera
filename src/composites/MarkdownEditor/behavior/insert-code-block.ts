/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';
import { FENCE, FENCED_PATTERN } from '../MarkdownEditor.constants';

const insertCodeBlock = (text: string, start: number, end: number): TextEdit => {
  const to = end > start && text.charAt(end - 1) === '\n' ? end - 1 : end;
  const picked = text.slice(start, to);
  const fenced = FENCED_PATTERN.exec(picked);
  if (fenced) return { from: start, to, insert: fenced[1] ?? '', selectStart: start, selectEnd: start + (fenced[1] ?? '').length };
  const lead = start === 0 || text.charAt(start - 1) === '\n' ? '' : '\n';
  const trail = to === text.length || text.charAt(to) === '\n' ? '' : '\n';
  const bodyStart = start + lead.length + FENCE.length + 1;
  return {
    from: start,
    to,
    insert: `${lead}${FENCE}\n${picked}\n${FENCE}${trail}`,
    selectStart: bodyStart,
    selectEnd: bodyStart + picked.length,
  };
};

export { insertCodeBlock };
