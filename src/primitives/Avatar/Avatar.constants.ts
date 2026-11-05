/* @layer renderer-components @kind constants */
import type { AvatarSize } from './Avatar.type';

const AVATAR_ICON_SIZE: Readonly<Record<AvatarSize, number>> = { xs: 10, sm: 14, lg: 28 };

const AVATAR_INITIALS_MAX = 2;

export { AVATAR_ICON_SIZE, AVATAR_INITIALS_MAX };
