/* @layer renderer-components @kind types */
interface BarSpotAttrs {
  fallback: { left: number; top: number } | null;
  ready: boolean;
  measuring: true | undefined;
  docked: true | undefined;
}

export type { BarSpotAttrs };
