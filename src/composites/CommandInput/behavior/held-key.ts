/* @layer renderer-components @kind logic */
import type { CommandKeyEvent } from '../CommandInput.type';

const heldKey = (event: CommandKeyEvent): boolean => event.isComposing || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey;

export { heldKey };
