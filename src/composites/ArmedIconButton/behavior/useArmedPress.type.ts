/* @layer renderer-components @kind types */
import type { ConfirmAsk } from '../../ConfirmIconButton/behavior/useConfirmAsk.type';

interface ArmedPress {
  ask: ConfirmAsk<true>;
  armed: boolean;
  name: string;
  press: () => void;
}

export type { ArmedPress };
