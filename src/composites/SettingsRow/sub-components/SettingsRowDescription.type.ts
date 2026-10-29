/* @layer renderer-components @kind types */
import type { FoldOverflow } from '../../../primitives/FoldText';

interface SettingsRowDescriptionProps {
  text: string;
  lines?: number;
  overflow?: FoldOverflow;
}

export type { SettingsRowDescriptionProps };
