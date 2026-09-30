/* @layer renderer-components @kind component */
import { HeaderTabs } from '../../HeaderTabs';
import { TABS_CLASS } from '../SettingsPage.constants';
import type { SettingsPageStripProps } from './SettingsPageStrip.type';

const SettingsPageStrip = (props: SettingsPageStripProps) => {
  const { title, tabs, anchors, activeId, onJump } = props;
  if (tabs) {
    return (
      <HeaderTabs className={TABS_CLASS} items={tabs.items} activeId={tabs.activeId} onSelect={tabs.onSelect} ariaLabel={`${title} views`} />
    );
  }
  if (anchors.length < 2) return null;
  return <HeaderTabs className={TABS_CLASS} items={anchors} activeId={activeId} onSelect={onJump} ariaLabel={`${title} sections`} />;
};

export { SettingsPageStrip };
