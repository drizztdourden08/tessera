/* @layer renderer-components @kind types */
import type { SparklineBand, SparklinePoint } from '../Sparkline.type';

interface SparklineDotProps {
  end: SparklinePoint | null;
  latest: number | undefined;
  band: SparklineBand | undefined;
}

export type { SparklineDotProps };
