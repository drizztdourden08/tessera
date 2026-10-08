/* @layer renderer-components @kind logic */
import type { ChoiceRoomOf } from '../../../primitives/dom/choice-room.type';
import { ROW_SELECTOR } from '../SettingsRow.constants';
import { choiceRoom } from './choice-room';
import { measureRow } from './measure-row';

const settingsChoiceRoom = (compact: boolean): ChoiceRoomOf => (probe) => {
  const row = probe.closest<HTMLElement>(ROW_SELECTOR);
  return row ? { box: row, width: choiceRoom(measureRow(row), compact) } : null;
};

export { settingsChoiceRoom };
