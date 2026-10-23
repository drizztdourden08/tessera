/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { DropdownMenu } from '../../DropdownMenu';
import type { MenuGroup } from '../../DropdownMenu';
import { MENU_FILTER_FROM } from '../DocumentTabs.constants';
import type { DocumentTabsMenuProps } from '../DocumentTabs.type';

const DocumentTabsMenu = ({ tabs, activeId, onActivate }: DocumentTabsMenuProps) => {
  const { documentTabs } = useTesseraStrings();
  const groups: MenuGroup[] = [{
    id: 'documents',
    items: tabs.map((tab) => ({
      id: tab.id,
      label: tab.title,
      icon: tab.icon,
      kind: 'radio',
      checked: tab.id === activeId,
      description: tab.unsaved ? documentTabs.unsaved : undefined,
      onSelect: () => onActivate(tab.id),
    })),
  }];
  return (
    <DropdownMenu
      trigger={{ label: documentTabs.menu, icon: 'chevron-down', iconOnly: true }}
      groups={groups}
      label={documentTabs.menu}
      size="xs"
      align="end"
      filter={tabs.length > MENU_FILTER_FROM}
      className="document-tabs__menu"
    />
  );
};

export { DocumentTabsMenu };
