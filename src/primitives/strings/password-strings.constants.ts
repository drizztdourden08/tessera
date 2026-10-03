/* @layer renderer-components @kind data */
const PASSWORD_STRINGS = {
  password: 'Password',
  showPassword: 'Show password',
  capsLockOn: 'Caps Lock is on',
  strength: 'Password strength',
  weak: 'Weak',
  fair: 'Fair',
  good: 'Good',
  strong: 'Strong',
  requirements: 'Password requirements',
  met: 'met',
  notMet: 'not met',
  ruleState: (label: string, state: string) => `${label}, ${state}`,
  strengthIs: (level: string) => `Strength: ${level}`,
};

export { PASSWORD_STRINGS };
