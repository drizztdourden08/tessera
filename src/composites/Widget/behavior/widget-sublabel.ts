/* @layer renderer-components @kind logic */
import type { WidgetProps } from '../Widget.type';

const widgetSublabel = ({ tabs, activeId }: Pick<WidgetProps, 'tabs' | 'activeId'>): string | undefined =>
  (tabs.find((tab) => tab.id === activeId) ?? tabs[0])?.sublabel;

export { widgetSublabel };
