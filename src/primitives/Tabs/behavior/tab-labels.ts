/* @layer renderer-components @kind util */
import type { TabItem, TabLabels } from '../Tabs.type';

const tabLabels = (tab: TabItem, iconOnly: boolean): TabLabels => {
  const reason = tab.disabled === true ? tab.disabledReason : undefined;
  const badgeTitle = tab.badge == null ? undefined : tab.badgeTitle;
  const description = [reason, badgeTitle].filter(Boolean).join(' ') || undefined;
  if (!iconOnly) return { description };
  return description ? { description, name: tab.label } : { title: tab.label };
};

export { tabLabels };
