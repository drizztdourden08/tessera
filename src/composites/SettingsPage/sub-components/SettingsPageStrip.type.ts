/* @layer renderer-components @kind types */
import type { SettingsPageAnchor, SettingsPageTabs } from '../SettingsPage.type';

interface SettingsPageStripProps {
  title: string;
  tabs?: SettingsPageTabs;
  anchors: readonly SettingsPageAnchor[];
  activeId: string;
  onJump: (id: string) => void;
}

export type { SettingsPageStripProps };
