/* @layer renderer-components @kind logic */
import type { MenuGroup, MenuItem } from '../../DropdownMenu';
import type { ToolbarDefinition, ToolbarLayout } from '../ToolbarDock.type';
import { canShowToolbar } from './can-show-toolbar';
import { isToolbarShown } from './is-toolbar-shown';
import type { ToolbarMenuWords } from './toolbar-menu.type';

const toolbarMenuGroups = (
  definitions: readonly ToolbarDefinition[],
  layout: ToolbarLayout,
  toggle: (id: string) => void,
  menu: ToolbarMenuWords,
): MenuGroup[] => {
  const { onReset, ...words } = menu;
  const items: MenuItem[] = definitions.map((def) => {
    const shown = isToolbarShown(layout, def.id);
    return {
      id: def.id,
      label: def.label,
      kind: 'check' as const,
      checked: shown,
      disabled: !shown && !canShowToolbar(layout, def.id, definitions),
      onSelect: () => toggle(def.id),
    };
  });
  const groups: MenuGroup[] = [{ id: 'toolbars', label: words.menu, items }];
  if (onReset) groups.push({ id: 'toolbars-reset', items: [{ id: 'reset', label: words.reset, icon: 'rotate-ccw', onSelect: onReset }] });
  return groups;
};

export { toolbarMenuGroups };
