/* @layer stories @kind data */
import type { FileEntry } from '../../../src/composites';

const SEED = '48213907715260934413';
const KB = 1024;
const MB = KB * KB;
const DAY = new Date(2026, 9, 4, 19, 2).getTime();
const MINUTE = 60 * 1000;

const OUTPUT_FILES: readonly FileEntry[] = [
  { path: `runs/friday/AP_${SEED}.zip`, size: 18.4 * MB, modified: DAY },
  { path: `runs/friday/AP_${SEED}.archipelago`, size: 2.1 * MB, modified: DAY, icon: 'package' },
  { path: `runs/friday/AP_${SEED}_P1_Ana.aptimespinner`, size: 41 * KB, modified: DAY },
  { path: `runs/friday/AP_${SEED}_P2_Bram.aplttp`, size: 614 * KB, modified: DAY },
  { path: `runs/friday/AP_${SEED}_Spoiler.txt`, size: 1.3 * MB, modified: DAY },
  { path: `runs/friday/AP_${SEED}.apsave`, size: 205 * KB, modified: DAY + 42 * MINUTE, icon: 'save' },
  { path: 'runs/friday/server.log', size: 307 * KB, modified: DAY + 43 * MINUTE },
];

const LOG_FILES: readonly FileEntry[] = [
  { path: 'logs/brock.log', size: 88 * KB, modified: DAY },
  { path: 'logs/brock.1.log', size: 1.1 * MB, modified: DAY - 1440 * MINUTE },
  { path: 'logs/crash-2026-10-03.txt', size: 3 * KB, modified: DAY - 1500 * MINUTE },
];

export { LOG_FILES, OUTPUT_FILES };
