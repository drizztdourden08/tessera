/* @layer renderer-components @kind util */
import type { TabItem, TabLabels } from '../Tabs.type';

const tabLabels = (tab: TabItem, iconOnly: boolean): TabLabels => {
  const reason = tab.disabled === true ? tab.disabledReason : undefined;
  if (!iconOnly) return { reason };
  return reason ? { reason, name: tab.label } : { title: tab.label };
};

export { tabLabels };
