/* @layer renderer-components @kind logic */
import { resolveFieldKit } from '../../field-kits';
import { substituteDisplay } from './display-substitution';
import { groupKeyText } from './group-key-text';
import { KEY_RENDERED_KINDS } from '../DataTable.constants';
import type { ReactNode } from 'react';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { TesseraStrings } from '../../../primitives/strings/tessera-strings.type';
import type { DisplaySubstitution } from './display-substitution.type';

const groupKeyContent = (
  key: string,
  field: FieldDescriptor | undefined,
  substitution: DisplaySubstitution | undefined,
  strings: TesseraStrings,
): ReactNode => {
  if (!key) return strings.table.noGroupValue;
  if (!field) return key;
  const text = groupKeyText(key, field.kind, strings);
  if (text !== undefined) return text;
  const kit = KEY_RENDERED_KINDS.includes(field.kind) ? resolveFieldKit(field.kind) : undefined;
  if (!kit) return key;
  return kit.renderCell(key, field, { display: substituteDisplay(key, field, substitution) });
};

export { groupKeyContent };
