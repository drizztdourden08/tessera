/* @layer renderer-components @kind types */
import type { FoldOverflow } from '../../../primitives/FoldText';
import type { Hint } from '../../../primitives/hint/hint.type';
import type { SettingsRowHeadProps } from './SettingsRowHead.type';
import type { SettingsRowLineProps } from './SettingsRowLine.type';

interface SettingsRowTextProps extends SettingsRowLineProps, Omit<SettingsRowHeadProps, 'lead'> {
  description?: string;
  descriptionLines?: number;
  descriptionOverflow?: FoldOverflow;
  current?: Hint;
}

export type { SettingsRowTextProps };
