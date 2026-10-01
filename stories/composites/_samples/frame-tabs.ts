/* @layer stories @kind logic */
import type { WidgetTab } from '../../../src/composites';

type FrameTabs = { tabs: WidgetTab[]; activeId: string; label: string };

const TABS: WidgetTab[] = [{ id: 'hints', label: 'Hints' }, { id: 'players', label: 'Players' }];

const frameTabs = (tabbed: boolean, active: string): FrameTabs => {
  const tabs = tabbed ? TABS : TABS.slice(0, 1);
  const activeId = tabbed ? active : 'hints';
  return { tabs, activeId, label: tabs.find((tab) => tab.id === activeId)?.label ?? activeId };
};

export { frameTabs };
export type { FrameTabs };
