/* @layer renderer-components @kind util */
import type { FramePlayer, PlayerKeyAction } from '../PixelPlayer.type';

const runKeyAction = (player: FramePlayer, action: PlayerKeyAction): void => {
  const runs: Readonly<Record<PlayerKeyAction, () => void>> = {
    toggle: player.toggle,
    back: () => player.step(-1),
    forward: () => player.step(1),
    first: () => player.jump('first'),
    last: () => player.jump('last'),
  };
  runs[action]();
};

export { runKeyAction };
