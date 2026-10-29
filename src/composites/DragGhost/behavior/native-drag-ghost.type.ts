/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface NativeDragGhostInput {
  count: number;
  thumbnails?: readonly ReactNode[];
}

interface NativeDragStartEvent {
  dataTransfer: Pick<DataTransfer, 'setDragImage'> | null;
  currentTarget: EventTarget | null;
}

interface NativeGhostMount {
  holder: HTMLElement;
  dispose: () => void;
}

type MountNativeGhost = (doc: Document, input: NativeDragGhostInput) => NativeGhostMount;

interface NativeDragGhost {
  onDragStart: (event: NativeDragStartEvent, input: NativeDragGhostInput) => void;
}

export type { MountNativeGhost, NativeDragGhost, NativeDragGhostInput, NativeDragStartEvent };
