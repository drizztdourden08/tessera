/* @layer renderer-components @kind types */
import type { WidgetProps } from '../Widget.type';

type WidgetBodyProps = Pick<WidgetProps, 'padding' | 'fill' | 'disabled' | 'onOpenSettings' | 'children'>;

export type { WidgetBodyProps };
