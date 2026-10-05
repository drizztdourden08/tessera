/* @layer renderer-components @kind util */
import type { PasswordClassParams } from './password-class.type';

const passwordClass = (params: PasswordClassParams): string => {
  const { size, monospace, masked, start, className } = params;
  return [
    'password-input',
    `control-size--${size}`,
    monospace ? 'password-input--mono' : '',
    masked ? 'password-input--masked' : '',
    start ? 'password-input--start' : '',
    className,
  ].filter(Boolean).join(' ');
};

export { passwordClass };
