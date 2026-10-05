/* @layer renderer-components @kind types */
interface ListWidthLimits {
  initial: number;
  min: number;
  max: number;
}

interface ListWidthOptions extends ListWidthLimits {
  storageKey?: string;
}

export type { ListWidthLimits, ListWidthOptions };
