/* @layer renderer-components @kind data */
import type { MarkdownEditorListStyle } from '../MarkdownEditor.type';

const LIST_MARKERS: Readonly<Record<MarkdownEditorListStyle, RegExp>> = {
  bullet: /^(\s*)[-*+] /,
  number: /^(\s*)\d+[.)] /,
};

export { LIST_MARKERS };
