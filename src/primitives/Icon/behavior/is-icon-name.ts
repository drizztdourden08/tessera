/* @layer renderer-components @kind util */
import { ICONS } from '../Icon.constants';
import type { IconName } from '../Icon.type';

const isIconName = (name: string): name is IconName => Object.hasOwn(ICONS, name);

export { isIconName };
