/* @layer stories @kind data */
import type { LogKindDef, LogRow } from '../../../src/composites';

const CSI = '\u001b[';
const paint = (codes: string, text: string): string => `${CSI}${codes}m${text}${CSI}0m`;

const TERMINAL_KINDS: readonly LogKindDef[] = [{ id: 'out', label: 'Output' }];

const BUILD_LINES: readonly string[] = [
  `${paint('1;36', '$')} pnpm build`,
  `${paint('90', 'vite v6.0.0')} building for production`,
  `${paint('32', 'ok')} 412 modules transformed`,
  `${paint('33', 'warn')} chunk ${paint('4', 'main.js')} is ${paint('1', '612 kB')}, over the 500 kB hint`,
  `${paint('32', 'ok')} dist/index.html ${paint('2', '0.46 kB')}`,
  `${paint('32', 'ok')} dist/assets/main.js ${paint('2', '612.10 kB')}`,
  `${paint('1;37;41', ' FAIL ')} tests/save.test.ts ${paint('91', '1 failed')}, ${paint('92', '38 passed')}`,
  `${paint('31', 'x')} ${paint('3', 'restores the last save slot')}: expected ${paint('32', '3')}, received ${paint('31', '2')}`,
  `${paint('38;5;208', 'note')} 256-colour codes fall to the nearest of the sixteen`,
  `${paint('38;2;120;200;255', 'note')} so do true-colour codes`,
  `${CSI}2K${CSI}1G${paint('1;32', 'done')} in 4.1 s`,
];

const buildRow = (n: number): LogRow => ({
  id: `term-${n}`, gutter: '', tag: '', kind: 'out', message: BUILD_LINES[n % BUILD_LINES.length] ?? '',
});

const HELP = [paint('1', 'Commands'), `  ${paint('36', 'help')}   list the commands`, `  ${paint('36', 'build')}  run a build`, `  ${paint('36', 'clear')}  empty the screen`];

const BUILD_REPLY = [`${paint('90', 'building')}...`, `${paint('32', 'ok')} built in 1.2 s`];

const shellReply = (command: string): readonly string[] => {
  if (command === 'help') return HELP;
  if (command === 'build') return BUILD_REPLY;
  if (command === '') return [];
  return [`${paint('31', 'error')}: ${paint('1', command)} is not a command, try ${paint('36', 'help')}`];
};

export { buildRow, BUILD_LINES, shellReply, TERMINAL_KINDS };
