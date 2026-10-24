/* @layer renderer-components @kind util */
import type { DocumentTab } from '../DocumentTabs.type';

const tabbableId = (tabs: readonly DocumentTab[], focusedId: string | null, activeId: string | undefined): string | undefined => {
  const open = [focusedId, activeId].find((id) => id != null && tabs.some((tab) => tab.id === id));
  return open ?? tabs[0]?.id;
};

export { tabbableId };
