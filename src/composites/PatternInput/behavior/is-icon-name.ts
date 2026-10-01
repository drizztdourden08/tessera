/* @layer renderer-components @kind util */
import { ICONS } from '../../../primitives/Icon/Icon.constants';
import type { IconName } from '../../../primitives/Icon/Icon.type';

const isIconName = (name: string): name is IconName => Object.hasOwn(ICONS, name);

export { isIconName };
