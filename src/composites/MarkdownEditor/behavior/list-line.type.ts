/* @layer renderer-components @kind types */
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

export type { ListKeyEvent, ListLine };
