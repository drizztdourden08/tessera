/* @layer renderer-components @kind component */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { HeaderAnchorNav } from '../../HeaderAnchorNav';
import { TABS_CLASS } from '../SettingsPage.constants';
import type { SettingsPageStripProps } from './SettingsPageStrip.type';

const SettingsPageStrip = (props: SettingsPageStripProps) => {
  const { title, tabs, anchors, activeId, onJump } = props;
  const { navigation } = useTesseraStrings();
  if (tabs) {
    return (
      <HeaderAnchorNav className={TABS_CLASS} items={tabs.items} activeId={tabs.activeId} onSelect={tabs.onSelect} ariaLabel={navigation.pageViews(title)} />
    );
  }
  if (anchors.length < 2) return null;
  return <HeaderAnchorNav className={TABS_CLASS} items={anchors} activeId={activeId} onSelect={onJump} ariaLabel={navigation.pageSections(title)} />;
};

export { SettingsPageStrip };
