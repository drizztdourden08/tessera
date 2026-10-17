/* @layer stories @kind data */
const INSET_PROFILES = [
  { name: 'Speedrun seed', meta: 'Randomizer, A Link to the Past' },
  { name: 'Casual run', meta: 'Vanilla, A Link to the Past' },
] as const;

const INSET_STATES = [
  { heading: 'Movement', rows: [{ name: 'Walk', frames: 36 }, { name: 'Stairs', frames: 12 }] },
  { heading: 'Combat', rows: [{ name: 'Sword swing', frames: 24 }] },
] as const;

export { INSET_PROFILES, INSET_STATES };
