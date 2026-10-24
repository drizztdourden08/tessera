/* @layer renderer-components @kind types */
import type { RefCallback } from 'react';
import type { DialogFocus } from '../../DialogShell/behavior/useDialogFocus.type';

interface PromptFocus extends DialogFocus {
  layerRef: RefCallback<HTMLElement>;
}

export type { PromptFocus };
