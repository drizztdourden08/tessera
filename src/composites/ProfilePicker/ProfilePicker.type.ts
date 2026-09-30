/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface ProfilePickerItem {
  id: string;
  name: string;
  meta?: ReactNode;
  aside?: ReactNode;
  icon?: ReactNode;
}

interface ProfilePickerProps {
  title: ReactNode;
  profiles: readonly ProfilePickerItem[];
  selectedId?: string | null;
  onSelect: (id: string) => void;
  onDelete?: (id: string) => void;
  create?: ReactNode;
  onNew?: () => void;
  newLabel?: string;
  className?: string;
}

export type { ProfilePickerItem, ProfilePickerProps };
