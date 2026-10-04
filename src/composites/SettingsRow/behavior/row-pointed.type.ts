/* @layer renderer-components @kind types */
interface PointHandlers {
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  onFocus: () => void;
  onBlur: () => void;
}

interface RowPointed {
  pointed: boolean;
  handlers: PointHandlers;
}

export type { PointHandlers, RowPointed };
