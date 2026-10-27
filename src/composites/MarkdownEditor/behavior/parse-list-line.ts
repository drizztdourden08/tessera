/* @layer renderer-components @kind logic */
import type { ListLine } from './list-line.type';
import { LIST_LINE } from './parse-list-line.constants';

const parseListLine = (line: string): ListLine | null => {
  const found = LIST_LINE.exec(line);
  if (!found) return null;
  return { indent: found[1] ?? '', marker: found[2] ?? '', gap: found[3] ?? ' ', box: found[4], content: found[5] ?? '' };
};

export { parseListLine };
