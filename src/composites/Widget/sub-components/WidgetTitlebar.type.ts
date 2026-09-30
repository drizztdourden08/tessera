/* @layer renderer-components @kind types */
import type { WidgetProps } from '../Widget.type';

type WidgetTitlebarProps = Omit<WidgetProps, 'children' | 'opacity'>;

export type { WidgetTitlebarProps };
