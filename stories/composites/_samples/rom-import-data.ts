/* @layer stories @kind data */
import type { WizardReviewSection, WizardStepDef } from '../../../src/composites';
import { ROM_FILE } from './rotp-profiles';

type RomImportDraft = { file: string; label: string; extractMusic: boolean; backupCopy: boolean };

const ROM_CHECKS = [
  { term: 'Internal title', detail: 'THE LEGEND OF ZELDA' },
  { term: 'Region', detail: 'USA, version 1.0' },
  { term: 'Size', detail: '1 MB (8 Mbit), no copier header' },
  { term: 'CRC32', detail: '777AAC2F' },
];

const INITIAL_ROM_IMPORT: RomImportDraft = { file: '', label: 'A Link to the Past (USA)', extractMusic: true, backupCopy: true };

const ROM_IMPORT_STEPS: readonly WizardStepDef<RomImportDraft>[] = [
  { id: 'file', label: 'ROM file', description: 'Pick the ROM you dumped from your own cartridge.', validate: (d) => (d.file === '' ? 'Choose a ROM file to continue.' : null) },
  { id: 'check', label: 'Check', description: 'The file is compared with the ROM Relic of the Past was built for.' },
  { id: 'assets', label: 'Assets', description: 'Graphics, sound and text are read from the ROM once and kept on this PC.', validate: (d) => (d.label.trim() === '' ? 'Name the ROM to continue.' : null) },
  { id: 'review', label: 'Review', description: 'Import the ROM and extract its assets.' },
];

const romImportReview = (draft: RomImportDraft): readonly WizardReviewSection[] => [
  { stepId: 'file', title: 'ROM file', rows: [{ term: 'File', detail: draft.file }] },
  { stepId: 'assets', title: 'Assets', rows: [
    { term: 'Name', detail: draft.label },
    { term: 'Music', detail: draft.extractMusic ? 'Extracted' : 'Played from the ROM' },
    { term: 'Backup', detail: draft.backupCopy ? 'A copy is kept in the data folder' : 'No copy' },
  ] },
];

export type { RomImportDraft };
export { INITIAL_ROM_IMPORT, ROM_CHECKS, ROM_FILE, ROM_IMPORT_STEPS, romImportReview };
