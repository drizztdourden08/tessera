/* @layer renderer-components @kind types */
interface ItemReaders {
  keyOf: (item: unknown) => string;
  labelOf: (item: unknown) => string;
  disabledOf: (item: unknown) => boolean;
  categoryOf: (item: unknown) => string | undefined;
}

export type { ItemReaders };
