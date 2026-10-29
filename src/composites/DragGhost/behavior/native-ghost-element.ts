/* @layer renderer-components @kind logic */
import { createElement } from 'react';
import { DragGhost } from '../DragGhost';
import type { ReactElement } from 'react';
import type { NativeDragGhostInput } from './native-drag-ghost.type';

const nativeGhostElement = (input: NativeDragGhostInput): ReactElement =>
  createElement(DragGhost, { count: input.count, thumbnails: input.thumbnails });

export { nativeGhostElement };
