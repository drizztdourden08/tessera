/* @layer renderer-components @kind logic */
import type { ScrubDataset } from './scrub-dataset.type';

const scrubDataset = (scrubbing: boolean, readOnly: boolean, compact: boolean | undefined): ScrubDataset => ({
  'data-scrubbing': scrubbing || undefined,
  'data-read-only': readOnly || undefined,
  'data-compact': compact ? true : undefined,
});

export { scrubDataset };
