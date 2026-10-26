/* @layer renderer-components @kind types */
import type { TextEdit } from '../MarkdownEditor.type';

interface ListLine {
  indent: string;
  marker: string;
  gap: string;
  box: string | undefined;
  content: string;
}

interface ListKeyEvent {
  key: string;
  ctrlKey: boolean;
  metaKey: boolean;
  altKey: boolean;
  shiftKey: boolean;
}

type ListEdit = (text: string, start: number, end: number) => TextEdit | null;

export type { ListEdit, ListKeyEvent, ListLine };
