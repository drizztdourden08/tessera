/* @layer renderer-components @kind hook */
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { useConfirmAsk } from '../../ConfirmIconButton/behavior/useConfirmAsk';
import { CONFIRM_AGAIN_MS } from '../../ConfirmIconButton/behavior/useConfirmAsk.constants';
import type { ArmedIconButtonProps } from '../ArmedIconButton.type';
import type { ArmedPress } from './useArmedPress.type';

const useArmedPress = (props: ArmedIconButtonProps): ArmedPress => {
  const { label, armedLabel, onConfirm, onCancel, onArm, timeout = CONFIRM_AGAIN_MS, disabled = false, defaultArmed = false } = props;
  const { items } = useTesseraStrings();
  const ask = useConfirmAsk<true>({
    onConfirm, onCancel, onAsk: onArm, disabled, timeout: timeout === false ? undefined : timeout, initial: defaultArmed ? true : null,
  });
  const armed = ask.asking !== null;
  return {
    ask,
    armed,
    name: armed ? (armedLabel ?? items.confirmAgain(label)) : label,
    press: armed ? ask.confirm : () => ask.ask(true),
  };
};

export { useArmedPress };
