/* @layer renderer-components @kind hook */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useConfirmAsk } from '../../ConfirmIconButton/behavior/useConfirmAsk';
import { CONFIRM_ITEM_MS } from '../DropdownMenu.constants';
import type { MenuItem } from '../DropdownMenu.type';
import type { ConfirmItem } from './useConfirmItem.type';

const useConfirmItem = (item: MenuItem, asks: boolean, pick: () => void): ConfirmItem => {
  const { items } = useTesseraStrings();
  const ask = useConfirmAsk<true>({ onConfirm: pick, timeout: CONFIRM_ITEM_MS });
  if (!asks) return { press: pick, asking: false, handlers: {} };
  const asking = ask.asking !== null;
  return {
    press: asking ? ask.confirm : () => ask.ask(true),
    asking,
    ask: item.confirm ?? items.confirmAgain(item.label),
    handlers: { onKeyDown: ask.onKeyDown, onBlur: ask.cancel, onMouseLeave: ask.cancel },
  };
};

export { useConfirmItem };
