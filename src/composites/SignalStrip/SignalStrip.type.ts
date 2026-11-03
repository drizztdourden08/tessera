/* @layer renderer-components @kind types */
import type { IconName } from '../../primitives/Icon/Icon.type';

type SignalTone = 'danger' | 'warning' | 'info' | 'success' | 'neutral';

interface SignalItem {
  id: string;
  icon: IconName;
  count?: number;
  label: string;
  tone: SignalTone;
  onClick?: () => void;
}

interface SignalStripProps {
  items: readonly SignalItem[];
  max?: number;
  'aria-label'?: string;
  className?: string;
}

export type { SignalItem, SignalStripProps, SignalTone };
