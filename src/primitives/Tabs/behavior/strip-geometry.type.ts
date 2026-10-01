/* @layer renderer-components @kind types */
interface StripMetrics {
  scrollLeft: number;
  scrollWidth: number;
  clientWidth: number;
}

interface StripEdges {
  canScrollBack: boolean;
  canScrollForward: boolean;
}

export type {
  StripEdges,
  StripMetrics,
};
