/* @layer renderer-components @kind types */
interface ScrollNode {
  readonly scrollTop: number;
  readonly scrollLeft: number;
  scrollTo: (options: ScrollToOptions) => void;
}

export type { ScrollNode };
