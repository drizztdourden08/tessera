/* @layer renderer-components @kind types */
interface HoldSession {
  release: () => void;
  stop: () => void;
}

export type { HoldSession };
