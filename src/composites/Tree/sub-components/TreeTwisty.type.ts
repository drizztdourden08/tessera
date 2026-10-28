/* @layer renderer-components @kind types */
interface TreeTwistyProps {
  branch: boolean;
  expanded: boolean;
  loading: boolean;
  onToggle: (() => void) | undefined;
}

export type { TreeTwistyProps };
