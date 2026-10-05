/* @layer renderer-components @kind types */
import type { CSSProperties, HTMLAttributes, ReactNode, Ref, RefObject } from 'react';
import type { FloatingPlacement } from '../Floating/Floating.type';
import type { PortalLayer } from '../Portal/Portal.type';

type AnchoredPlacement =
  | 'bottom-start' | 'bottom-end' | 'bottom-center' | 'top-start' | 'top-end' | 'top-center'
  | 'right-start' | 'right-center' | 'left-start' | 'left-center';

interface AnchoredProps extends HTMLAttributes<HTMLDivElement> {
  anchorRef: RefObject<HTMLElement | null>;
  placement?: AnchoredPlacement;
  flip?: boolean;
  layer?: PortalLayer;
  portal?: boolean;
  fallback?: FloatingPlacement | null;
  ref?: Ref<HTMLDivElement>;
  children?: ReactNode;
}

type AnchoredStyle = CSSProperties & Record<'--anchored-name', string>;

export type { AnchoredPlacement, AnchoredProps, AnchoredStyle };
