/* @layer renderer-components @kind logic */
const INDENT_MAX = 8;

const textIndent = (indent: number | undefined): number | undefined => {
  if (indent === undefined || !Number.isFinite(indent)) return undefined;
  return Math.min(INDENT_MAX, Math.max(0, Math.round(indent)));
};

export { textIndent };
