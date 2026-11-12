/* @layer renderer-components @kind logic */
import { INDENT_MAX } from './text-indent.constants';

const textIndent = (indent: number | undefined): number | undefined => {
  if (indent === undefined || !Number.isFinite(indent)) return undefined;
  return Math.min(INDENT_MAX, Math.max(0, Math.round(indent)));
};

export { textIndent };
