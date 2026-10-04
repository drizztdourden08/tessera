/* @layer renderer-components @kind types */
interface TabTargetParams<T> {
  stops: readonly T[];
  active: T | null;
  backwards: boolean;
  container: T;
  inside: boolean;
}

export type { TabTargetParams };
