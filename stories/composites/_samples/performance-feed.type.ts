/* @layer stories @kind types */
interface PerformanceProcess {
  id: string;
  label: string;
  value: number;
}

interface PerformanceFrame {
  tick: number;
  seed: number;
  cpu: number;
  gpu: number;
  heat: number;
  fps: readonly number[];
  download: readonly number[];
  upload: readonly number[];
  processes: readonly PerformanceProcess[];
}

export type { PerformanceFrame, PerformanceProcess };
