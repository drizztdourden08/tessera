/* @layer renderer-components @kind data */
import type { StepperTone } from '../Stepper.type';
import type { StepperToneInk } from './stepper-tone-ink.type';

const tag = (name: string): StepperToneInk => ({ tone: `var(--c-tag-${name})`, on: 'var(--p-pure-black)' });

const STEPPER_TONES: Readonly<Record<StepperTone, StepperToneInk>> = {
  primary: { tone: 'var(--c-primary)', on: 'var(--c-on-primary)' },
  secondary: { tone: 'var(--c-secondary)', on: 'var(--c-on-secondary)' },
  tertiary: { tone: 'var(--c-tertiary)', on: 'var(--c-on-tertiary)' },
  success: { tone: 'var(--c-success)', on: 'var(--c-on-success)' },
  warning: { tone: 'var(--c-warning)', on: 'var(--c-on-warning)' },
  danger: { tone: 'var(--c-danger)', on: 'var(--c-on-danger)' },
  info: { tone: 'var(--c-info)', on: 'var(--c-on-info)' },
  rose: tag('rose'),
  orange: tag('orange'),
  amber: tag('amber'),
  lime: tag('lime'),
  green: tag('green'),
  teal: tag('teal'),
  cyan: tag('cyan'),
  blue: tag('blue'),
  violet: tag('violet'),
  pink: tag('pink'),
};

export { STEPPER_TONES };
