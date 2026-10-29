/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import { startNativeGhost } from './start-native-ghost';
import type { NativeDragGhost } from './native-drag-ghost.type';

const useNativeDragGhost = (): NativeDragGhost => useMemo(() => ({ onDragStart: (event, input) => startNativeGhost(event, input) }), []);

export { useNativeDragGhost };
