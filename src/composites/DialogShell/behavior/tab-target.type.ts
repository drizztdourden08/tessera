/* @layer renderer-components @kind types */
interface TabTargetParams<T> {
  stops: readonly T[];
  active: T | null;
  backwards: boolean;
  container: T;
  inside: boolean;
  follows?: (stop: T) => boolean;
}

export type { TabTargetParams };
