/* @layer renderer-components @kind logic */
const lineBounds = (text: string, start: number, end: number): readonly [number, number] => {
  const lineStart = start === 0 ? 0 : text.lastIndexOf('\n', start - 1) + 1;
  const last = end > start && text.charAt(end - 1) === '\n' ? end - 1 : end;
  const next = text.indexOf('\n', last);
  return [lineStart, next === -1 ? text.length : next];
};

export { lineBounds };
