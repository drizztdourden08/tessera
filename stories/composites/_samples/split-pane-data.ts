/* @layer stories @kind data */
interface SampleFile {
  name: string;
  size: string;
  lines: readonly string[];
}

const FILES: readonly SampleFile[] = [
  { name: 'session-notes.md', size: '2 KB', lines: ['# Friday run', 'Seven players, async start at 19:00.', 'Wren hosts; Tavi streams the first hour.', 'Goal: every slot reaches its ending.'] },
  { name: 'players.json', size: '4 KB', lines: ['{', '  "wren": { "game": "Hollow Knight", "slot": 1 },', '  "tavi": { "game": "Stardew Valley", "slot": 3 },', '  "priya": { "game": "Super Metroid", "slot": 4 }', '}'] },
  { name: 'item-log.txt', size: '18 KB', lines: ['19:04:02 Tavi sent Mantis Claw to Wren', '19:09:55 Dax sent Oil Processing to Oskar', '19:15:02 Marlowe completed their goal', '19:18:40 Kaede sent Speed Booster to Bastien'] },
  { name: 'rules.md', size: '1 KB', lines: ['# House rules', 'Hints cost 10 points.', 'Release on goal is on.', 'No glitches past the first boss.'] },
  { name: 'host.yaml', size: '3 KB', lines: ['port: 38281', 'password: none', 'release_mode: goal', 'hint_cost: 10'] },
];

const EDITOR_CODE = `import { SplitPane } from '@drizztdourden08/tessera';

export const Workspace = () => (
  <SplitPane
    orientation="vertical"
    start={<Editor file={file} />}
    end={<Console lines={output} />}
    defaultRatio={0.7}
    startLabel="editor"
    endLabel="console"
  />
);`;

const CONSOLE_LINES: readonly string[] = [
  '$ pnpm build',
  'compiling 214 modules',
  'src/workspace.tsx: ok',
  'src/console.tsx: 1 warning, unused import "useMemo"',
  'bundle written to dist/ in 1.84 s',
  '$ pnpm test',
  '38 passed, 0 failed',
];

export { CONSOLE_LINES, EDITOR_CODE, FILES };
