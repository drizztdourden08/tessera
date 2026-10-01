/* @layer stories @kind data */
import type { WizardProgressStep } from '../../../src/composites';

const STRIP_STEPS: readonly WizardProgressStep[] = [
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
  { id: 'shops', label: 'Shops', count: 0 },
  { id: 'dungeon', label: 'Dungeon', count: 2 },
  { id: 'capacity', label: 'Capacity upgrades', count: 0 },
  { id: 'pond', label: 'Fairy ponds', count: 0 },
];

const LONG_LABELS: Readonly<Record<string, string>> = { seed: 'Seed and connection', options: 'Randomizer options' };

const stripSteps = (look: { summaries: boolean; subSteps: boolean; long: boolean }, current: number): readonly WizardProgressStep[] =>
  STRIP_STEPS.map((step, index) => ({
    ...step,
    label: look.long ? LONG_LABELS[step.id] ?? step.label : step.label,
    summary: look.summaries && index < current ? SUMMARIES[step.id] : undefined,
    subSteps: look.subSteps && step.id === 'options' ? SUB_STEPS : undefined,
  }));

const idAt = (index: number): string => STRIP_STEPS[Math.min(Math.max(index, 0), STRIP_STEPS.length - 1)]?.id ?? 'basics';

export { idAt, STRIP_STEPS, stripSteps };
