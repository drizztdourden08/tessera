/* @layer renderer-components @kind types */
import type { DockEdge } from '../../DockLayout';
import type { DockPlace } from './widget-layout.type';

interface JoinOn extends Pick<DockPlace, 'weight' | 'weightOf'> {
  edge: DockEdge;
}

export type { JoinOn };
