/* @layer renderer-components @kind util */
import type { PasswordMode, PasswordStrength } from '../PasswordInput.type';

const defaultStrength = (mode: PasswordMode, ruleCount: number): PasswordStrength => (mode === 'new' && ruleCount > 0 ? 'rules' : false);

export { defaultStrength };
