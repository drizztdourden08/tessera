/* @layer renderer-components @kind types */
interface ElapsedWatcher {
  listener: () => void;
  at: number;
  due: number;
  oneUnit: boolean;
}

export type { ElapsedWatcher };
