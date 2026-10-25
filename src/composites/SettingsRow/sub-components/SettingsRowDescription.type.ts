/* @layer renderer-components @kind types */
import type { FoldOverflow } from '../../../primitives/fold-text/fold-text.type';

interface SettingsRowDescriptionProps {
  text: string;
  lines?: number;
  overflow?: FoldOverflow;
}

export type { SettingsRowDescriptionProps };
