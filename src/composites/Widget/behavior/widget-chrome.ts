/* @layer renderer-components @kind logic */
import type { WidgetChrome, WidgetProps } from '../Widget.type';

const widgetChrome = ({ chrome = 'full', peek = false }: Pick<WidgetProps, 'chrome' | 'peek'>): WidgetChrome =>
  (peek && chrome === 'none' ? 'compact' : chrome);

export { widgetChrome };
