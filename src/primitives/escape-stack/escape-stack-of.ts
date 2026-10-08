/* @layer renderer-components @kind logic */
import { ESCAPE_STACKS } from './escape-stack.constants';
import { topEscape } from './top-escape';
import type { EscapeDocument, EscapeStack } from './escape-stack.type';

const escapeStackOf = (doc: EscapeDocument | undefined): EscapeStack => {
  const entries = () => (doc === undefined ? undefined : ESCAPE_STACKS.get(doc)) ?? [];
  return {
    depth: () => entries().length,
    top: () => topEscape(entries())?.level ?? null,
  };
};

export { escapeStackOf };
