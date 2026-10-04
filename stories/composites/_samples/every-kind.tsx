/* @layer stories @kind data */
import type { SettingsInputKind, SettingsItem } from '../../../src/composites';
import { isSettingsRowItem } from './is-settings-row-item';
import {
  accountSections, audioSections, controlsSections, displaySections, generalSections,
} from './settings-sample-sections';
import type { SampleState } from './settings-sample-state';
import { CUSTOM_ROW } from './custom-row';

const KIND_ORDER: readonly SettingsInputKind[] = [
  'toggle', 'select', 'segmented', 'radio', 'multi', 'slider', 'number', 'text', 'password', 'dynamic', 'color', 'keybind', 'tags', 'custom',
];

const allRows = (state: SampleState): SettingsItem[] =>
  [generalSections, displaySections, audioSections, accountSections, controlsSections]
    .flatMap((build) => build(state))
    .flatMap((section) => [...(section.rows ?? []), ...(section.groups ?? []).flatMap((group) => group.rows)])
    .filter(isSettingsRowItem);

const everyKind = (state: SampleState): SettingsItem[] => {
  const rows = [...allRows(state), CUSTOM_ROW];
  return KIND_ORDER.flatMap((kind) => {
    const row = rows.find((candidate) => candidate.input?.kind === kind);
    return row === undefined ? [] : [{ ...row, lock: null }];
  });
};

const rowOfKind = (state: SampleState, kind: SettingsInputKind): SettingsItem | undefined =>
  everyKind(state).find((row) => row.input?.kind === kind);

export { everyKind, KIND_ORDER, rowOfKind };
