/* @layer renderer-components @kind types */
import type { ProfilePickerItem } from '../ProfilePicker.type';

interface ProfilePickerRowProps {
  profile: ProfilePickerItem;
  selected: boolean;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
}

export type { ProfilePickerRowProps };
