/* @layer renderer-components @kind logic */
const trimSelection = (text: string, start: number, end: number): readonly [number, number] => {
  const picked = text.slice(start, end);
  const lead = picked.length - picked.trimStart().length;
  if (lead === picked.length) return [end, end];
  return [start + lead, end - (picked.length - picked.trimEnd().length)];
};

export { trimSelection };
