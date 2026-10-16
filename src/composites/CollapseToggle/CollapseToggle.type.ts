/* @layer renderer-components @kind types */
import type { Ref } from 'react';

type CollapseToggleSide = 'start' | 'end';

interface CollapseToggleProps {
  collapsed: boolean;
  onToggle: () => void;
  label: string;
  side?: CollapseToggleSide;
  controls?: string;
  ref?: Ref<HTMLButtonElement>;
  className?: string;
}

export type { CollapseToggleProps, CollapseToggleSide };
