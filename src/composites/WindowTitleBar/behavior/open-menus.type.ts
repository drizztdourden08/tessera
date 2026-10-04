/* @layer renderer-components @kind types */
interface OpenMenus {
  anyOpen: boolean;
  report: (id: string, open: boolean) => void;
}

export type { OpenMenus };
