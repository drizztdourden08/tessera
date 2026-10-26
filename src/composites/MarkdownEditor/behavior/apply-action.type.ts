/* @layer renderer-components @kind types */
import type { TextEdit } from '../MarkdownEditor.type';

type ActionEdit = (text: string, start: number, end: number) => TextEdit;

export type { ActionEdit };
