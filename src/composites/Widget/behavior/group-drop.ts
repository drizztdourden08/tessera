/* @layer renderer-components @kind logic */
import { keepsGroups } from '../../DockLayout';
import type { DockLayoutProps, WidgetId } from '../../DockLayout';
import type { WidgetDefinition } from '../Widget.type';

const groupDrop = (
  definitionOf: (id: WidgetId) => WidgetDefinition | undefined,
  canDrop: DockLayoutProps['canDrop'],
): NonNullable<DockLayoutProps['canDrop']> =>
  (id, drop) => keepsGroups((other) => definitionOf(other)?.group, id, drop) && (canDrop?.(id, drop) ?? true);

export { groupDrop };
