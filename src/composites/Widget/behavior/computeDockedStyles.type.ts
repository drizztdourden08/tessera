/* @layer renderer-components @kind types */
import type { CSSProperties } from 'react';
import type { SnapSide, WidgetState } from '../Widget.type';

interface ExclusiveInsets {
  left: number;
  right: number;
  top: number;
  bottom: number;
}

interface DockedLayoutResult {
  styles: Map<string, CSSProperties>;
  exclusiveInsets: ExclusiveInsets;
}

type DockedSides = Record<SnapSide, WidgetState[]>;

interface DockFrame {
  position: 'absolute' | 'fixed';
  fullHeight: string;
  fullWidth: string;
  topOffset: number;
  sizes: ExclusiveInsets;
}

type StyleEntry = [string, CSSProperties];

export type { DockedLayoutResult, DockedSides, DockFrame, ExclusiveInsets, StyleEntry };
