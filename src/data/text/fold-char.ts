/* @layer renderer-components @kind logic */
import { ACCENT_MARK } from './text.constants';

const foldChar = (char: string): string => char.normalize('NFD').replace(ACCENT_MARK, '').toLowerCase();

export { foldChar };
