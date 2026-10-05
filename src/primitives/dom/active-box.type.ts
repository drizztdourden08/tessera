/* @layer renderer-components @kind types */
interface ActiveBox {
  left: number;
  start: number;
  size: number;
}

interface ActiveMarker {
  box: ActiveBox | null;
  shown: boolean;
}

export type { ActiveBox, ActiveMarker };
