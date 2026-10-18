/* @layer renderer-components @kind types */
import type { RefObject } from 'react';

interface PaneFoldOptions {
  collapsible: boolean;
  collapsed: boolean | undefined;
  defaultCollapsed: boolean;
  onCollapsedChange: ((collapsed: boolean) => void) | undefined;
  storageKey: string | undefined;
}

interface PaneFold {
  collapsed: boolean;
  toggleRef: RefObject<HTMLButtonElement | null>;
  toggle: () => void;
  collapse: (() => void) | undefined;
  expand: (() => void) | undefined;
}

export type { PaneFold, PaneFoldOptions };
