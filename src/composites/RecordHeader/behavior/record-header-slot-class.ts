/* @layer renderer-components @kind logic */
import type { RecordHeaderSlotProps } from '../sub-components/RecordHeaderSlot.type';

const recordHeaderSlotClass = ({ main, content, code, menu }: RecordHeaderSlotProps): string =>
  ['record-header__slot', main && 'record-header__slot--main', content && 'record-header__slot--content', code && 'record-header__slot--code', menu && 'record-header__slot--menu'].filter(Boolean).join(' ');

export { recordHeaderSlotClass };
