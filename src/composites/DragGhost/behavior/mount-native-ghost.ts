/* @layer renderer-components @kind logic */
import { flushSync } from 'react-dom';
import { createRoot } from 'react-dom/client';
import { NATIVE_GHOST_CLASS } from '../DragGhost.constants';
import { nativeGhostElement } from './native-ghost-element';
import type { MountNativeGhost } from './native-drag-ghost.type';

const mountNativeGhost: MountNativeGhost = (doc, input) => {
  const holder = doc.createElement('div');
  holder.className = NATIVE_GHOST_CLASS;
  doc.body.appendChild(holder);
  const root = createRoot(holder);
  flushSync(() => root.render(nativeGhostElement(input)));
  return {
    holder,
    dispose: () => {
      root.unmount();
      holder.remove();
    },
  };
};

export { mountNativeGhost };
