/* @layer renderer-components @kind logic */
import type { TextEdit } from '../MarkdownEditor.type';

const applyEdit = (text: string, edit: TextEdit): string => `${text.slice(0, edit.from)}${edit.insert}${text.slice(edit.to)}`;

export { applyEdit };
