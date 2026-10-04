/* @layer stories @kind logic */
import type { UtilityScreenAction } from '../../../src/composites';
import type { UpdateStep } from './update-states';

const updateActions = (step: UpdateStep, go: (next: UpdateStep) => void, close: () => void): UtilityScreenAction[] => {
  const later = { label: 'Later', variant: 'ghost', onClick: close } as const;
  if (step === 'available') return [later, { label: 'Install', variant: 'primary', onClick: () => go('downloading') }];
  if (step === 'downloading') return [{ label: 'Downloading', variant: 'primary', loading: true, onClick: () => undefined }];
  if (step === 'failed') return [later, { label: 'Try again', variant: 'primary', onClick: () => go('checking') }];
  if (step === 'current') return [{ label: 'Close', variant: 'primary', onClick: close }];
  return [later];
};

export { updateActions };
