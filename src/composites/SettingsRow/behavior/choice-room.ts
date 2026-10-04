/* @layer renderer-components @kind logic */
import { COMPACT_TITLE_MAX_SHARE } from '../SettingsRow.constants';
import type { RowBox } from './choice-room.type';

const choiceRoom = (row: RowBox, compact: boolean): number => {
  const content = Math.max(0, row.width - row.paddingInline);
  return compact ? Math.max(0, content - row.gap - Math.min(row.title, content * COMPACT_TITLE_MAX_SHARE)) : content;
};

export { choiceRoom };
