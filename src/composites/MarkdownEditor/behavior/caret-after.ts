/* @layer renderer-components @kind logic */
const caretAfter = (caret: number, at: number, oldLength: number, newLength: number): number => {
  if (caret >= at + oldLength) return caret + newLength - oldLength;
  return caret > at ? at + newLength : caret;
};

export { caretAfter };
