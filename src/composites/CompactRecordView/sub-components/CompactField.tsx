/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Text } from '../../../primitives/Text';
import { resolveFieldKit } from '../../field-kits';
import { unknownKit } from '../../field-kits/unknown-kit';
import { detectUnionBranch, isIdentityField, markedPaths } from '../../RecordEditor';
import { getPath } from '../../../data/schema/path';
import { DiffBracket } from './DiffBracket';
import type { FieldDescriptor, FieldKind } from '../../../data/schema/field-descriptor';
import type { CompactFieldProps } from '../CompactRecordView.type';
import '../../../theme/compact-record-view.css';

const kitFor = (kind: FieldKind) => resolveFieldKit(kind) ?? unknownKit;

const nestedChildrenFor = (
  field: FieldDescriptor,
  value: unknown,
  depth: number,
): readonly FieldDescriptor[] | null => {
  if (depth > 0) return null;
  if (field.kind === 'object') {
    const children = field.children ?? [];
    return children.length ? children : null;
  }
  if (field.kind === 'union') {
    const branch = detectUnionBranch(field, value);
    return branch.status === 'resolved' && branch.fields.length ? branch.fields : null;
  }
  return null;
};

const idRefDisplay = (
  field: FieldDescriptor,
  value: unknown,
  resolve: CompactFieldProps['resolveIdRefDisplay'],
): string | undefined => {
  if (field.kind !== 'idRef' || !resolve || isIdentityField(field.path)) return undefined;
  const id = typeof value === 'string' ? value.trim() : '';
  return id ? resolve(id, field.targetKind) : undefined;
};

const CompactField = (props: CompactFieldProps) => {
  const { record, field, depth, resolveIdRefDisplay, diffs } = props;
  const value = getPath(record, field.path);
  const nested = nestedChildrenFor(field, value, depth);

  if (nested) {
    const differsBelow = diffs ? markedPaths([...diffs.keys()]).has(field.path) : false;
    const nestClass = `compact-record-view__nest${differsBelow ? ' compact-record-view__nest--differs' : ''}`;
    return (
      <Box className={nestClass}>
        <Text as="span" className="compact-record-view__nest-label" title={field.path}>
          {field.label}
        </Text>
        <Box className="compact-record-view__nested">
          {nested.map((child) => (
            <CompactField
              key={child.path}
              record={record}
              field={child}
              depth={depth + 1}
              resolveIdRefDisplay={resolveIdRefDisplay}
              diffs={diffs}
            />
          ))}
        </Box>
      </Box>
    );
  }

  const difference = diffs?.get(field.path);
  const rowClass = `compact-record-view__row${difference ? ' compact-record-view__row--differs' : ''}`;

  return (
    <Box className={rowClass}>
      <Text as="span" className="compact-record-view__label" title={field.path}>
        {field.label}
      </Text>
      <Box className="compact-record-view__value">
        {kitFor(field.kind).renderCell(value, field, {
          display: idRefDisplay(field, value, resolveIdRefDisplay),
          resolveIdRefDisplay,
        })}
        {difference && <DiffBracket difference={difference} />}
      </Box>
    </Box>
  );
};

export { CompactField };
