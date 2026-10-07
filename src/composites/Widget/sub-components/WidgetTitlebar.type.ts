/* @layer renderer-components @kind types */
import type { WidgetProps } from '../Widget.type';

type WidgetTitlebarProps = Omit<WidgetProps, 'children' | 'opacity'> & { titleId: string };

export type { WidgetTitlebarProps };
