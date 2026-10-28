/* @layer renderer-components @kind util */
import { hexInk } from '../../hex-ink/hex-ink';

const swatchInk = (color: string, transparent: boolean): 'light' | 'dark' => (transparent ? null : hexInk(color)) ?? 'light';

export { swatchInk };
