/* @layer renderer-components @kind types */
import type { MouseEventHandler, ReactNode, Ref } from 'react';

type OverlayTone = 'glass' | 'scrim' | 'secondary' | 'clear';

interface OverlayProps {
  visible: boolean;
  tone?: OverlayTone;
  blur?: boolean;
  keepMounted?: boolean;
  onClick?: MouseEventHandler<HTMLElement>;
  'aria-hidden'?: boolean;
  ref?: Ref<HTMLElement>;
  className?: string;
  children?: ReactNode;
}

interface OverlayLooks {
  visible: boolean;
  tone: OverlayTone;
  blur: boolean;
  keepMounted: boolean;
  className?: string;
}

export type { OverlayLooks, OverlayProps, OverlayTone };
