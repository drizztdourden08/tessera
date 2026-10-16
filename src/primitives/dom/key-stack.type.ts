/* @layer renderer-components @kind types */
type KeyDocument = Pick<Document, 'addEventListener' | 'removeEventListener'>;

type KeyStackHandler<E> = (entries: readonly E[], event: KeyboardEvent) => void;

interface KeyStack<E> {
  entries: (doc: KeyDocument | undefined) => readonly E[];
  push: (doc: KeyDocument, entry: E) => () => void;
}

export type { KeyDocument, KeyStack, KeyStackHandler };
