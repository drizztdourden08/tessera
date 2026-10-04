/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { useDialogFocus } from '../../DialogShell/behavior/useDialogFocus';
import { layerScope } from './layer-scope';
import { useInertSiblings } from './useInertSiblings';
import type { LayerFocus } from './useLayerFocus.type';

const useLayerFocus = (open: boolean, headingId: string | undefined): LayerFocus => {
  const [layer, setLayer] = useState<HTMLElement | null>(null);
  useInertSiblings(open ? layer : null);
  const focus = useDialogFocus({ open, initialFocus: 'first', headingId, scopeOf: layerScope });
  return { ...focus, layerRef: setLayer };
};

export { useLayerFocus };
