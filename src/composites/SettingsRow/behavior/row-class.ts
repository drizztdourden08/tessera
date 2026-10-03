/* @layer renderer-components @kind logic */
import type { SettingsRowProps } from '../SettingsRow.type';

const rowClass = (props: Pick<SettingsRowProps, 'compact' | 'readOnly' | 'disabled' | 'flash' | 'className'>): string => [
  'settings-row',
  props.compact === true && 'settings-row--compact',
  props.readOnly === true && 'settings-row--read-only',
  props.disabled === true && 'settings-row--disabled',
  props.flash === true && 'search-hit',
  props.className,
].filter(Boolean).join(' ');

export { rowClass };
