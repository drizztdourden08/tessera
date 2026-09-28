/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WidgetState } from '../Widget.type';

interface WidgetSettingsProps {
  widget: WidgetState;
  anchorRef: React.RefObject<HTMLElement | null>;
  onClose: () => void;
  onChange: (patch: Partial<WidgetState>) => void;
  children?: ReactNode;
  exclusiveLabel?: string;
}

export type { WidgetSettingsProps };
