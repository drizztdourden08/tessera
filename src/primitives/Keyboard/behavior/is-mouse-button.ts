/* @layer renderer-components @kind util */
import { MOUSE_SPECS } from '../sub-components/MouseCap.constants';
import type { MouseButton } from '../Keyboard.type';

const isMouseButton = (key: string): key is MouseButton => Object.hasOwn(MOUSE_SPECS, key);

export { isMouseButton };
