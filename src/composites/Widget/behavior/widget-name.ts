/* @layer renderer-components @kind logic */
import type { WidgetProps } from '../Widget.type';

const widgetName = ({ id, tabs, activeId }: Pick<WidgetProps, 'id' | 'tabs' | 'activeId'>): string =>
  tabs.find((tab) => tab.id === activeId)?.label ?? tabs[0]?.label ?? id;

export { widgetName };
