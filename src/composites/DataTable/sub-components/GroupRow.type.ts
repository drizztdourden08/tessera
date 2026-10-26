/* @layer renderer-components @kind types */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { ActionItem } from '../../ActionBar';
import type { DisplaySubstitution } from '../behavior/display-substitution.type';

interface GroupRowProps {
  level: number;
  groupKey: string;
  field?: FieldDescriptor;
  count: number;
  expanded: boolean;
  onToggle: () => void;
  display?: DisplaySubstitution;
  index?: number;
  actions?: readonly ActionItem[];
}

export type { GroupRowProps };
