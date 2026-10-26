/* @layer stories @kind logic */
import type { WidgetTab } from '../../../src/composites';

type FrameTabs = { tabs: WidgetTab[]; activeId: string; label: string };

const TABS: WidgetTab[] = [{ id: 'hints', label: 'Hints' }, { id: 'players', label: 'Players' }];

const ICONS = { hints: 'circle-help', players: 'users' } as const;

const frameTabs = (tabbed: boolean, active: string, icons = false): FrameTabs => {
  const all = icons ? TABS.map((tab) => ({ ...tab, icon: ICONS[tab.id as keyof typeof ICONS] })) : TABS;
  const tabs = tabbed ? all : all.slice(0, 1);
  const activeId = tabbed ? active : 'hints';
  return { tabs, activeId, label: tabs.find((tab) => tab.id === activeId)?.label ?? activeId };
};

export { frameTabs };
export type { FrameTabs };
