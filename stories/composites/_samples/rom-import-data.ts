/* @layer stories @kind data */
import type { WizardReviewSection, WizardStepDef } from '../../../src/composites';
import { ROM_FILE } from './rotp-profiles';

type RomImportDraft = { file: string; label: string; extractMusic: boolean; backupCopy: boolean };

const ROM_CHECKS = [
  { label: 'Internal title', value: 'THE LEGEND OF ZELDA' },
  { label: 'Region', value: 'USA, version 1.0' },
  { label: 'Size', value: '1 MB (8 Mbit), no copier header' },
  { label: 'CRC32', value: '777AAC2F' },
];

const INITIAL_ROM_IMPORT: RomImportDraft = { file: '', label: 'A Link to the Past (USA)', extractMusic: true, backupCopy: true };

const ROM_IMPORT_STEPS: readonly WizardStepDef<RomImportDraft>[] = [
  { id: 'file', label: 'ROM file', description: 'Pick the ROM you dumped from your own cartridge.', validate: (d) => (d.file === '' ? 'Choose a ROM file to continue.' : null) },
  { id: 'check', label: 'Check', description: 'The file is compared with the ROM Relic of the Past was built for.', hint: 'Every check passed.' },
  { id: 'assets', label: 'Assets', description: 'Graphics, sound and text are read from the ROM once and kept on this PC.', validate: (d) => (d.label.trim() === '' ? 'Name the ROM to continue.' : null) },
  {
    id: 'review',
    label: 'Review',
    description: 'Import the ROM and extract its assets.',
    busyHint: 'Extracting assets...',
    buttons: { next: { label: 'Import ROM', icon: 'download' } },
  },
];

const romImportReview = (draft: RomImportDraft): readonly WizardReviewSection[] => [
  { stepId: 'file', title: 'ROM file', rows: [{ label: 'File', value: draft.file }] },
  { stepId: 'assets', title: 'Assets', rows: [
    { label: 'Name', value: draft.label },
    { label: 'Music', value: draft.extractMusic ? 'Extracted' : 'Played from the ROM' },
    { label: 'Backup', value: draft.backupCopy ? 'A copy is kept in the data folder' : 'No copy' },
  ] },
];

export type { RomImportDraft };
export { INITIAL_ROM_IMPORT, ROM_CHECKS, ROM_FILE, ROM_IMPORT_STEPS, romImportReview };
