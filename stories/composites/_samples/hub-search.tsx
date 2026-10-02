/* @layer stories @kind component */
import { useState } from 'react';
import { SettingsGroupList } from '../../../src/composites';
import type { SearchResultsGroup, SearchResultsJump, SettingsGroupListSection } from '../../../src/composites';
import { Toggle } from '../../../src/primitives';
import { HUB_PAGES } from './hub';
import { HUB_SETTINGS } from './hub-settings';
import type { HubSetting } from './hub-settings';

interface Switches {
  on: ReadonlySet<string>;
  flip: (id: string) => void;
}

const useSwitches = (): Switches => {
  const [on, setOn] = useState<ReadonlySet<string>>(() => new Set(['restore', 'updates', 'tray', 'archive']));
  const flip = (id: string) => setOn((prev) => {
    const next = new Set(prev);
    if (!next.delete(id)) next.add(id);
    return next;
  });
  return { on, flip };
};

const sectionsOf = (settings: readonly HubSetting[], switches: Switches): SettingsGroupListSection[] => {
  const titles = [...new Set(settings.map((s) => s.section))];
  return titles.map((title) => ({
    id: title.toLowerCase(),
    title,
    groups: [{
      rows: settings.filter((s) => s.section === title).map((s) => ({
        key: s.id,
        content: <Toggle checked={switches.on.has(s.id)} onChange={() => switches.flip(s.id)} label={s.label} description={s.description} />,
      })),
    }],
  }));
};

const settingsOf = (page: string, needle = ''): HubSetting[] =>
  HUB_SETTINGS.filter((s) => s.page === page && s.label.toLowerCase().includes(needle));

const hubGroups = (query: string, switches: Switches): SearchResultsGroup[] => {
  const needle = query.trim().toLowerCase();
  return HUB_PAGES.flatMap((page) => {
    const rows = settingsOf(page.id, needle);
    if (needle === '' || rows.length === 0) return [];
    const children = <SettingsGroupList sections={sectionsOf(rows, switches)} />;
    return [{ id: page.id, label: page.label, icon: page.icon, count: rows.length, children }];
  });
};

const hubJumps = (query: string): SearchResultsJump[] => {
  const needle = query.trim().toLowerCase();
  if (needle === '') return [];
  return HUB_PAGES.filter((p) => p.label.toLowerCase().includes(needle)).map((p) => ({ id: p.id, label: p.label, icon: p.icon }));
};

const settingsSummary = (count: number, query: string): string | undefined =>
  count === 0 ? undefined : `${count} ${count === 1 ? 'setting matches' : 'settings match'} "${query.trim()}"`;

const countOf = (groups: readonly SearchResultsGroup[]): number => groups.reduce((sum, g) => sum + (g.count ?? 0), 0);

export { countOf, hubGroups, hubJumps, sectionsOf, settingsOf, settingsSummary, useSwitches };
export type { Switches };
