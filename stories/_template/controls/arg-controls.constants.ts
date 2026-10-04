/* @layer stories @kind data */

const SEGMENTED_LIMIT = { count: 3, characters: 8 } as const;

const SEARCHABLE_FROM = 12;

const PLAYGROUND_GROUPS = ['Content', 'Value', 'Appearance', 'Layout', 'State', 'Behaviour', 'Motion', 'Data'] as const;

export { PLAYGROUND_GROUPS, SEARCHABLE_FROM, SEGMENTED_LIMIT };
