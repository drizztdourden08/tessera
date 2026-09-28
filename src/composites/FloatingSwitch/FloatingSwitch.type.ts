/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';

interface FloatingSwitchItem {
  id: string;
  label: string;
  icon: ReactNode;
  disabled?: boolean;
}

interface FloatingSwitchProps {
  items: FloatingSwitchItem[];
  activeId: string;
  onSelect: (id: string) => void;
  label: string;
  className?: string;
}

export type { FloatingSwitchItem, FloatingSwitchProps };
