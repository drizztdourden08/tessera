/* @layer renderer-components @kind logic */
import { escapeKeys } from './escape-keys';
import type { EscapeDocument, EscapeHolds, EscapeLevel } from './escape-stack.type';

const pushEscape = (doc: EscapeDocument, level: EscapeLevel, onEscape: () => void, holds?: EscapeHolds): (() => void) =>
  escapeKeys.push(doc, { level, onEscape, holds });

export { pushEscape };
