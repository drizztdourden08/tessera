/* @layer renderer-components @kind types */
interface UsePanelOpenParams {
  rail: boolean;
  collapsed: boolean;
  defaultOpen: boolean;
  overlay: boolean;
  onSelect: (id: string) => void;
}

export type { UsePanelOpenParams };
