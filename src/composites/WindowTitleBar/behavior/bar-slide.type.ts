/* @layer renderer-components @kind types */
interface BarItemPlace {
  offset: number;
  out: number;
  away: boolean;
}

interface BarItemSnapshot {
  offset: number;
  opacity: number;
  seen: boolean;
  away: boolean;
}

type BarSnapshot = ReadonlyMap<string, BarItemSnapshot>;

export type { BarItemPlace, BarItemSnapshot, BarSnapshot };
