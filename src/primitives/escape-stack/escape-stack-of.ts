/* @layer renderer-components @kind logic */
import { escapeKeys } from './escape-keys';
import { topEscape } from './top-escape';
import type { EscapeDocument, EscapeStack } from './escape-stack.type';

const escapeStackOf = (doc: EscapeDocument | undefined): EscapeStack => ({
  depth: () => escapeKeys.entries(doc).length,
  top: () => topEscape(escapeKeys.entries(doc))?.level ?? null,
});

export { escapeStackOf };
