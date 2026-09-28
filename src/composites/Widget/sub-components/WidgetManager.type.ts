/* @layer renderer-components @kind types */
import type { ReactNode } from 'react';
import type { WidgetBounds, WidgetDefinition, WidgetDisabledState, WidgetLayout, WidgetState } from '../Widget.type';
import type { ExclusiveInsets } from '../behavior/computeDockedStyles.type';

interface WidgetManagerProps<D extends WidgetDefinition = WidgetDefinition> {
  definitions: readonly D[];
  layout: WidgetLayout;
  contextActive: boolean;
  pageOpen?: boolean;
  onUpdate: (id: string, patch: Partial<WidgetState>) => void;
  onClose: (id: string) => void;
  onInsetsChange?: (insets: ExclusiveInsets) => void;
  children: Record<string, ReactNode>;
  settingsContent?: Record<string, ReactNode>;
  developerToolsEnabled?: boolean;
  startupForcedWidgetIds?: string[];
  resolveDisabled?: (definition: D) => WidgetDisabledState | null;
  onOpenSettings?: (settingId: string) => void;
  topOffset?: number;
  bounds?: WidgetBounds;
  exclusiveLabel?: string;
}

export type { WidgetManagerProps };
