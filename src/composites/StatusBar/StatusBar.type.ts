/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { IconName } from '../../primitives/Icon/Icon.type';
import type { StatusTone } from '../../primitives/Status/Status.type';

type StatusBarAlign = 'start' | 'end';

interface StatusBarEntry {
  id: string;
  label: ReactNode;
  value: ReactNode;
  icon?: IconName;
  swatch?: string;
  tone?: StatusTone;
  title?: string;
  align?: StatusBarAlign;
  priority?: number;
}

interface StatusBarProps {
  items: readonly StatusBarEntry[];
  label: string;
  className?: string;
}

export type { StatusBarAlign, StatusBarEntry, StatusBarProps };
