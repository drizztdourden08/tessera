/* @layer renderer-components @kind logic */
import type { SettingsRowProps } from '../SettingsRow.type';

const rowData = (props: SettingsRowProps): Record<string, string | boolean | undefined> => ({
  'data-setting-key': props.id,
  'data-kind': props.input?.kind ?? 'none',
  'data-changed': props.changed === true || undefined,
});

export { rowData };
