/* @layer stories @kind logic */
import type { UtilityScreenAction } from '../../../src/composites';
import type { UpdateStep } from './update-states';

const updateActions = (step: UpdateStep, go: (next: UpdateStep) => void, close: () => void): UtilityScreenAction[] => {
  const later = { label: 'Later', tone: 'tertiary', onSelect: close } as const;
  if (step === 'available') return [later, { label: 'Install', tone: 'primary', onSelect: () => go('downloading') }];
  if (step === 'downloading') return [later, { label: 'Downloading', tone: 'primary', disabled: true, onSelect: () => undefined }];
  if (step === 'failed') return [later, { label: 'Try again', tone: 'primary', retry: true, onSelect: () => go('checking') }];
  if (step === 'current') return [{ label: 'Close', tone: 'primary', onSelect: close }];
  return [later];
};

export { updateActions };
