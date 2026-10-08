/* @layer renderer-components @kind types */
interface DismissLayer {
  close: () => void;
  holds: (node: Node) => boolean;
}

type DismissDocument = Pick<Document, 'addEventListener' | 'removeEventListener'>;

export type { DismissDocument, DismissLayer };
