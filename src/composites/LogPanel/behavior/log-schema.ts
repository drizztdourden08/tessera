/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { LogKindDef } from '../LogPanel.type';
import type { LogSchemaLabels } from './log-schema.type';

const logSchema = (kinds: readonly LogKindDef[] | undefined, labels: LogSchemaLabels): readonly FieldDescriptor[] => [
  ...(kinds && kinds.length > 0
    ? [{ path: 'kind', label: labels.kind, kind: 'enum' as const, optional: false, closed: true, options: kinds.map((kind) => kind.label) }]
    : []),
  { path: 'tag', label: labels.tag, kind: 'string', optional: false },
  { path: 'message', label: labels.message, kind: 'string', optional: false },
];

export { logSchema };
