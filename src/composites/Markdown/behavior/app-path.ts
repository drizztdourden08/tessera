/* @layer renderer-components @kind util */
import { APP_PATH } from './app-path.constants';

const isAppPath = (url: string): boolean => APP_PATH.test(url);

export { isAppPath };
