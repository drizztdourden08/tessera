/* @layer renderer-components @kind types */
import type { AboutPanelCopy } from '../AboutPanel.type';

interface AboutCopyButtonProps {
  text: string | null;
  label: string;
  onCopy?: AboutPanelCopy;
}

export type { AboutCopyButtonProps };
