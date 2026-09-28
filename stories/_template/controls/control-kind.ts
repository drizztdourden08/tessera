/* @layer stories @kind logic */
import type { StoryLiteArgType } from '@storylite/storylite';

type ControlKind = 'boolean' | 'text' | 'textarea' | 'number' | 'color' | 'select';

const kindOf = (argType: StoryLiteArgType, value: unknown): ControlKind | null => {
  const { control, options } = argType;
  if (typeof control === 'string') return control;
  if (control) return control.type;
  if (options?.length) return 'select';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'number') return 'number';
  if (typeof value === 'string') return 'text';
  return null;
};

export { kindOf };
export type { ControlKind };
