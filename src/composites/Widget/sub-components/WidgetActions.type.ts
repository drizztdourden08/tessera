/* @layer renderer-components @kind types */
import type { WidgetProps } from '../Widget.type';

type WidgetActionsProps = Pick<
  WidgetProps, 'mode' | 'pin' | 'onPinChange' | 'titleBarActions' | 'onPopOut' | 'canPopOut' | 'optionsOpen' | 'onOpenOptions' | 'onClose'
>;

export type { WidgetActionsProps };
