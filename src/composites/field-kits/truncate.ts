/* @layer renderer-components @kind logic */
import { PREVIEW_MAX } from './summary.constants';

const truncate = (text: string, max: number = PREVIEW_MAX): string =>
  (text.length > max ? `${text.slice(0, max - 3)}...` : text);

export { truncate };
