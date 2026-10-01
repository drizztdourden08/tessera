/* @layer stories @kind data */
import type { IconName } from '../../../src/primitives';

type ProfileRow = { name: string; icon: IconName; meta: string; aside: string };

const ROM_FILE = 'The Legend of Zelda: A Link to the Past (USA).sfc';

const ROM_NAME = 'The Legend of Zelda: A Link to the Past (USA)';

const PROFILE_ROWS: readonly ProfileRow[] = [
  { name: 'Speedrun seed', icon: 'sparkles', meta: `Randomizer, ${ROM_NAME}`, aside: '2 hours ago' },
  { name: 'Casual run', icon: 'play', meta: `Vanilla, ${ROM_NAME}`, aside: 'Yesterday' },
  { name: 'Weekly async', icon: 'globe', meta: `Online Randomizer, ${ROM_NAME}`, aside: 'Sep 21' },
];

export type { ProfileRow };
export { PROFILE_ROWS, ROM_FILE, ROM_NAME };
