/* @layer renderer-components @kind types */
interface OverflowProbe {
  scrollWidth: number;
  clientWidth: number;
  flexibleRendered: number;
  flexibleFitted: number;
}

type GrowFallback = ReadonlyMap<string, number> | null;

export type { GrowFallback, OverflowProbe };
