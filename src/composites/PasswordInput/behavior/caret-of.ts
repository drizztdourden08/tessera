/* @layer renderer-components @kind util */
import type { CaretRange } from './reveal.type';

const caretOf = (input: HTMLInputElement | null): CaretRange | null => {
  if (input?.selectionStart == null || input.selectionEnd === null) return null;
  return { start: input.selectionStart, end: input.selectionEnd, direction: input.selectionDirection ?? 'none' };
};

export { caretOf };
