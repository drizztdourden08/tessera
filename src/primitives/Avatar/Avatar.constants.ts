/* @layer renderer-components @kind constants */
import type { AvatarSize, AvatarStatus } from './Avatar.type';

const AVATAR_ICON_SIZE: Readonly<Record<AvatarSize, number>> = { xs: 10, sm: 14, lg: 28 };

const AVATAR_INITIALS_MAX = 2;

const AVATAR_STATUS_WORD: Readonly<Record<Exclude<AvatarStatus, 'none'>, string>> = {
  running: 'running',
  quiet: 'quiet',
  fault: 'fault',
};

export { AVATAR_ICON_SIZE, AVATAR_INITIALS_MAX, AVATAR_STATUS_WORD };
