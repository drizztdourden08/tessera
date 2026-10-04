/* @layer renderer-components @kind logic */
import type { AltTap, AltTapKey } from './alt-tap.type';

const altTap = (armed: boolean, event: AltTapKey): AltTap => {
  const alt = event.key === 'Alt';
  if (event.type === 'keydown') return { armed: alt && !event.repeat, fire: false };
  return { armed: false, fire: alt && armed };
};

export { altTap };
