/* @layer renderer-components @kind util */
import { KEY_ACTIONS } from '../PixelPlayer.constants';
import type { PlayerKeyAction } from '../PixelPlayer.type';

const playerKeyAction = (key: string): PlayerKeyAction | null => KEY_ACTIONS[key] ?? null;

export { playerKeyAction };
