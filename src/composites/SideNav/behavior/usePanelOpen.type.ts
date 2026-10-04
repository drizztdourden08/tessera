/* @layer renderer-components @kind types */
interface UsePanelOpenParams {
  rail: boolean;
  collapsed: boolean;
  defaultOpen: boolean;
  overlay: boolean;
  onSelect: (id: string) => void;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  storageKey?: string;
}

export type { UsePanelOpenParams };
