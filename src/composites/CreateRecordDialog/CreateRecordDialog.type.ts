/* @layer renderer-components @kind types */
import type { DataAttributes } from '../../primitives/dom/data-attributes.type';
import type { FieldDescriptor, SchemaConfig } from '../../data/schema/field-descriptor';
import type { IdRefOptionResolver } from '../field-kits/registry';
import type { NumberBoundsResolver, TagCreator, TagSuggestionResolver } from '../RecordEditor';

type CreateOutcome =
  | { success: true; id: string }
  | { success: false; error: string };

interface CreateRecordDialogProps {
  open: boolean;
  title: string;
  schema: readonly FieldDescriptor[];
  config?: SchemaConfig;
  initialRecord: Record<string, unknown>;
  requiredPaths: readonly string[];
  resolveIdRefOptions?: IdRefOptionResolver;
  resolveTagSuggestions?: TagSuggestionResolver;
  onCreateTag?: TagCreator;
  resolveNumberBounds?: NumberBoundsResolver;
  onCreate: (record: Record<string, unknown>) => Promise<CreateOutcome>;
  onCreated: (id: string) => void;
  onCancel: () => void;
  id?: string;
  data?: DataAttributes;
}

export type { CreateOutcome, CreateRecordDialogProps };
