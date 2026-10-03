/* @layer stories @kind component */
import { SettingsGroupList } from '../../../src/composites';
import { Paragraph } from '../../../src/primitives';
import { sectionsOf, settingsOf } from './hub-search';
import type { Switches } from './hub-search';

const HubPageBody = (props: { id: string; switches: Switches }) => {
  const { id, switches } = props;
  const rows = settingsOf(id);
  return rows.length > 0
    ? <SettingsGroupList sections={sectionsOf(rows, switches)} />
    : <Paragraph tone="muted">This page has no settings. Search for tray, players or session.</Paragraph>;
};

export { HubPageBody };
