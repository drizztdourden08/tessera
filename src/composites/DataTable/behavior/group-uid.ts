/* @layer renderer-components @kind logic */
import { SEPARATOR } from './group-uid.constants';

const groupUid = (parentUid: string, path: string, key: string): string =>
  `${parentUid}${SEPARATOR}${path}=${key}`;

export { groupUid };
