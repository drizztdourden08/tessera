/* @layer stories @kind data */
import type { IconName, StepperStep, StepperTone } from '../../../src/primitives';

const STEPPER_STEPS: readonly StepperStep[] = [
  { id: 'basics', label: 'Basics' },
  { id: 'mode', label: 'Mode' },
  { id: 'seed', label: 'Seed' },
  { id: 'options', label: 'Options' },
  { id: 'settings', label: 'Settings' },
  { id: 'review', label: 'Review' },
];

const SUMMARIES: Readonly<Record<string, string>> = {
  basics: 'Hyrule practice',
  mode: 'Randomizer, local',
  seed: '3f9a0c71be42d580',
  options: '6 changed',
  settings: 'Vanilla, German (Deutsch)',
};

const SUB_STEPS = [
  { id: 'world', label: 'World', count: 1 },
  { id: 'goal', label: 'Goal', count: 0 },
  { id: 'items', label: 'Items', count: 3 },
  { id: 'dungeon', label: 'Dungeon', count: 2 },
  { id: 'pond', label: 'Fairy ponds', count: 0 },
];

const STEP_TONES: Readonly<Record<string, StepperTone>> = { basics: 'success', mode: 'info', seed: 'violet', options: 'amber', settings: 'teal', review: 'rose' };

const STEP_ICONS: Readonly<Record<string, IconName>> = { basics: 'house', mode: 'gamepad-2', seed: 'key-round', options: 'sliders-horizontal', settings: 'settings' };

const LONG_LABELS: Readonly<Record<string, string>> = { seed: 'Seed and connection', options: 'Randomizer options' };

type StepperLook = { summaries: boolean; subSteps: boolean; long: boolean; errorAt?: string; tones?: boolean; icons?: boolean };

const stepperSteps = (look: StepperLook, current: number): readonly StepperStep[] =>
  STEPPER_STEPS.map((step, index) => ({
    ...step,
    label: look.long ? LONG_LABELS[step.id] ?? step.label : step.label,
    summary: look.summaries && index < current ? SUMMARIES[step.id] : undefined,
    subSteps: look.subSteps && step.id === 'options' ? SUB_STEPS : undefined,
    error: step.id === look.errorAt,
    tone: look.tones === true ? STEP_TONES[step.id] : undefined,
    doneIcon: look.icons === true ? STEP_ICONS[step.id] : undefined,
  }));

const stepIdAt = (index: number): string => STEPPER_STEPS[Math.min(Math.max(index, 0), STEPPER_STEPS.length - 1)]?.id ?? 'basics';

export { STEPPER_STEPS, stepIdAt, stepperSteps };
