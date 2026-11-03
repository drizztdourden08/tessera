/* @layer renderer-components @kind util */
import type { PlayerKeyAction } from '../PixelPlayer.type';

const ACTIONS: Readonly<Record<string, PlayerKeyAction>> = {
  ' ': 'toggle',
  ArrowLeft: 'back',
  ArrowRight: 'forward',
  Home: 'first',
  End: 'last',
};

const playerKeyAction = (key: string): PlayerKeyAction | null => ACTIONS[key] ?? null;

export { playerKeyAction };
