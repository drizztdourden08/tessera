/* @layer renderer-components @kind logic */
import { IDENTITY_PATH } from './identity-field.constants';

const isIdentityField = (path: string): boolean => path === IDENTITY_PATH;

export { isIdentityField };
