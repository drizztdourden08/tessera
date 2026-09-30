/* @layer renderer-components @kind types */
import type { RefObject } from 'react';
import type { Rect } from '../DockLayout.type';

interface MainGripProps {
  rect: Rect;
  stageRef: RefObject<HTMLElement | null>;
  label: string;
  hint: string;
}

export type { MainGripProps };
