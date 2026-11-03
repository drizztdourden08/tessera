/* @layer renderer-components @kind logic */
import type { BarRole } from '../AnchoredBar.type';

const barAriaModal = (role: BarRole): false | undefined => (role === 'dialog' || role === 'alertdialog' ? false : undefined);

export { barAriaModal };
