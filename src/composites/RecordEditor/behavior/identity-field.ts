/* @layer renderer-components @kind logic */
import { IDENTITY_PATH } from '../../../data/schema/path/identity-path.constants';

const isIdentityField = (path: string): boolean => path === IDENTITY_PATH;

export { isIdentityField };
