/* @layer renderer-components @kind hook */
import { useSyncExternalStore } from 'react';
import type { KeyboardPlatform, ResolvedPlatform } from '../Keyboard.type';

const subscribe = () => () => undefined;

const detectPlatform = (): ResolvedPlatform => (/Mac|iPhone|iPad|iPod/.test(navigator.userAgent) ? 'mac' : 'windows');

const serverPlatform = (): ResolvedPlatform => 'windows';

const usePlatform = (platform: KeyboardPlatform): ResolvedPlatform => {
  const detected = useSyncExternalStore(subscribe, detectPlatform, serverPlatform);
  return platform === 'auto' ? detected : platform;
};

export { usePlatform };
