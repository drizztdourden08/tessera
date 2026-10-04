/* @layer renderer-components @kind types */
interface MenuContextValue {
  close: () => void;
  closeOnSelect: boolean;
  look: string;
}

type MenuFocusStart = 'first' | 'last' | 'none';

export type { MenuContextValue, MenuFocusStart };
