/* @layer renderer-components @kind logic */
import type { SettingsRowProps } from '../SettingsRow.type';

const rowClass = (props: Pick<SettingsRowProps, 'compact' | 'readOnly' | 'disabled' | 'flash' | 'problem' | 'actions' | 'className'>): string => [
  'settings-row',
  props.compact === true && 'settings-row--compact',
  props.readOnly === true && 'settings-row--read-only',
  props.disabled === true && 'settings-row--disabled',
  props.problem != null && 'settings-row--problem',
  props.actions !== undefined && props.actions.length > 0 && 'settings-row--actions',
  props.flash === true && 'search-hit',
  props.className,
].filter(Boolean).join(' ');

export { rowClass };
