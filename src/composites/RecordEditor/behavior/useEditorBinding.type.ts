/* @layer renderer-components @kind types */
import type { IdRefOptionResolver } from '../../field-kits/registry.type';
import type {
  NumberBoundsResolver, TagCreator, TagSuggestionResolver,
} from '../RecordEditor.type';

interface UseEditorBindingInput {
  working: unknown;
  setValue: (path: string, value: unknown) => void;
  isPathDirty: (path: string) => boolean;
  readOnly: boolean;
  changedPaths?: readonly string[];
  resolveIdRefOptions?: IdRefOptionResolver;
  resolveTagSuggestions?: TagSuggestionResolver;
  onCreateTag?: TagCreator;
  resolveNumberBounds?: NumberBoundsResolver;
}

export type { UseEditorBindingInput };
