/* @layer stories @kind data */
import type { WizardProblem, WizardReviewSection, WizardStepDef, WizardStepInfo } from '../../../src/composites';
import { EXISTING_NAMES, GAMES, LANGUAGES, MODE_LABEL, MSU_PACKS, PRESETS } from './profile-wizard-data';
import type { Choice, ProfileDraft } from './profile-wizard-data';
import { changedIn, changedTotal, RANDOMIZER_TABS } from './randomizer-options';

const randomizer = (draft: ProfileDraft): boolean => draft.mode !== 'standard';

const nameProblem = (name: string): WizardProblem | null => {
  if (name.trim() === '') return 'Give the profile a name to continue.';
  return EXISTING_NAMES.includes(name.trim()) ? { message: 'A profile with this name already exists.', inField: true } : null;
};

const seedProblem = (draft: ProfileDraft): string | null => {
  if (draft.seed.trim() === '') return 'Roll or type a seed to continue.';
  if (draft.mode === 'online' && (draft.server === '' || draft.slot.trim() === '')) return 'Pick a room and enter your slot name.';
  return null;
};

const PROFILE_STEPS: readonly WizardStepDef<ProfileDraft>[] = [
  { id: 'basics', label: 'Basics', description: 'Name the profile and pick the game it plays.', validate: (d) => nameProblem(d.name) },
  { id: 'mode', label: 'Mode', description: 'How this profile plays. You cannot change it later.', validate: (d) => (d.mode === '' ? 'Pick a mode to continue.' : null) },
  {
    id: 'seed',
    label: 'Seed and connection',
    description: 'The seed decides where every item lands. It locks once the profile exists.',
    when: randomizer,
    validate: seedProblem,
  },
  { id: 'options', label: 'Randomizer options', description: 'Every tab starts on the community defaults.', when: randomizer },
  { id: 'settings', label: 'Settings', description: 'You can change these at any time from the profile.' },
  { id: 'review', label: 'Review', description: 'Check everything, then create the profile.' },
];

const labelOf = (choices: readonly Choice[], value: string): string => choices.find((c) => c.value === value)?.label ?? value;

const seedLine = (draft: ProfileDraft): string => (draft.mode === 'online' ? `${draft.seed}, ${draft.slot || 'no slot'}` : draft.seed);

const profileStepInfo = (draft: ProfileDraft, visited: readonly string[], current: string): Readonly<Record<string, WizardStepInfo>> => {
  const seen = (id: string, summary: string) => (visited.includes(id) && id !== current ? summary : undefined);
  return {
    basics: { summary: seen('basics', draft.name.trim()) },
    mode: { summary: seen('mode', MODE_LABEL[draft.mode]) },
    seed: { summary: seen('seed', seedLine(draft)) },
    options: {
      summary: seen('options', `${changedTotal(draft.options)} changed`),
      subSteps: RANDOMIZER_TABS.map((tab) => ({ id: tab.id, label: tab.label, count: changedIn(tab, draft.options) })),
    },
    settings: { summary: seen('settings', `${labelOf(PRESETS, draft.preset)}, ${labelOf(LANGUAGES, draft.language)}`) },
  };
};

const changedRows = (draft: ProfileDraft) => RANDOMIZER_TABS.map((tab) => ({ term: tab.label, detail: `${changedIn(tab, draft.options)} changed` }));

const profileReview = (draft: ProfileDraft): readonly WizardReviewSection[] => [
  { stepId: 'basics', title: 'Basics', rows: [{ term: 'Name', detail: draft.name }, { term: 'Game', detail: labelOf(GAMES, draft.rom) }] },
  { stepId: 'mode', title: 'Mode', rows: [{ term: 'Mode', detail: MODE_LABEL[draft.mode] }] },
  ...(randomizer(draft) ? [
    {
      stepId: 'seed',
      title: 'Seed and connection',
      rows: [
        { term: 'Seed', detail: draft.seed },
        ...(draft.mode === 'online' ? [{ term: 'Room', detail: draft.server }, { term: 'Slot', detail: draft.slot }] : []),
      ],
    },
    { stepId: 'options', title: 'Randomizer options', rows: changedRows(draft) },
  ] : []),
  {
    stepId: 'settings',
    title: 'Settings',
    rows: [
      { term: 'Preset', detail: labelOf(PRESETS, draft.preset) },
      { term: 'Language', detail: labelOf(LANGUAGES, draft.language) },
      { term: 'MSU pack', detail: labelOf(MSU_PACKS, draft.msu) },
    ],
  },
];

export { PROFILE_STEPS, profileReview, profileStepInfo };
