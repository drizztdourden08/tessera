/* @layer renderer-components @kind logic */
import type { PathInputView } from '../PathInput.type';

const pathFrameAttributes = (view: PathInputView, value: string | null, nativeDrop: boolean) => ({
  'data-dropping': view.drop.dropping || undefined,
  'data-invalid': view.invalid || undefined,
  'data-disabled': view.disabled || undefined,
  title: value ?? undefined,
  ...(nativeDrop ? view.drop.handlers : undefined),
});

export { pathFrameAttributes };
