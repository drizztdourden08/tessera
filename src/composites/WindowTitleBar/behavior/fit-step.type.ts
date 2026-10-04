/* @layer renderer-components @kind types */
type BarSide = 'start' | 'end';

interface BarItemSize {
  side: BarSide;
  width: number;
  shown: boolean;
}

interface BarSizes {
  width: number;
  startEnd: number;
  endWidth: number;
  startGap: number;
  endGap: number;
  items: readonly BarItemSize[];
  brand: number;
  logo: number;
  small: number;
}

export type { BarItemSize, BarSide, BarSizes };
