/* @layer renderer-components @kind logic */
import { isElement } from '../../../primitives/dom/is-element';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { pageDocument } from '../../../primitives/dom/page-document';
import { mountNativeGhost } from './mount-native-ghost';
import type { MountNativeGhost, NativeDragGhostInput, NativeDragStartEvent } from './native-drag-ghost.type';

const startNativeGhost = (event: NativeDragStartEvent, input: NativeDragGhostInput, mount: MountNativeGhost = mountNativeGhost): void => {
  const data = event.dataTransfer;
  const doc = isElement(event.currentTarget) ? ownerDocumentOf(event.currentTarget) : pageDocument();
  if (!data || !doc || input.count <= 0) return;
  const ghost = mount(doc, input);
  data.setDragImage(ghost.holder, Math.round(ghost.holder.offsetWidth / 2), Math.round(ghost.holder.offsetHeight / 2));
  setTimeout(ghost.dispose, 0);
};

export { startNativeGhost };
