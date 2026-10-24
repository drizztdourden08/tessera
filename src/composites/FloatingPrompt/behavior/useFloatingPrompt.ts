/* @layer renderer-components @kind hook */
import { useState } from 'react';
import { ownerDocumentOf } from '../../../primitives/dom/owner-document';
import { useEscapeLayer } from '../../../primitives/escape-stack/useEscapeLayer';
import { useDialogFocus } from '../../DialogShell/behavior/useDialogFocus';
import { keyFromInside } from '../../ScreenLayer/behavior/key-from-inside';
import { useInertSiblings } from '../../ScreenLayer/behavior/useInertSiblings';
import { useInertSet } from '../../ScreenLayer/behavior/useInertSet';
import type { FloatingPromptAction, FloatingPromptScope } from '../FloatingPrompt.type';
import { cancelOf } from './cancel-of';
import { promptScope } from './prompt-scope';
import { aroundOf } from './around-of';
import type { PromptFocus } from './useFloatingPrompt.type';

const useFloatingPrompt = (open: boolean, scope: FloatingPromptScope, actions: readonly FloatingPromptAction[]): PromptFocus => {
  const [layer, setLayer] = useState<HTMLElement | null>(null);
  const live = open ? layer : null;
  useInertSiblings(scope === 'container' ? live : null);
  useInertSet(scope === 'window' ? live : null, aroundOf);
  const focus = useDialogFocus({ open, initialFocus: 'first', scopeOf: promptScope });
  const cancel = cancelOf(actions);
  useEscapeLayer(open && focus.node && cancel ? ownerDocumentOf(focus.node) : null, 'dialog', () => cancel?.onSelect(), keyFromInside(focus.node));
  return { ...focus, layerRef: setLayer };
};

export { useFloatingPrompt };
