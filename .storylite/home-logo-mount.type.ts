/* @layer root-config @kind types */
interface CssRegistry {
  set: (id: string, css: string) => void;
  delete: (id: string) => void;
  toArray: () => string[];
}

declare global {
  interface Window {
    __STORYLITE_IMPORTED_CSS__?: CssRegistry;
  }
}

export type { CssRegistry };
