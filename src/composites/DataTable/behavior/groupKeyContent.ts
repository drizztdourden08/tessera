/* @layer renderer-components @kind logic */
import { resolveFieldKit } from '../../field-kits';
import { substituteDisplay } from './display-substitution';
import { ABSENT_KEY_LABEL, KEY_RENDERED_KINDS } from '../DataTable.constants';
import type { ReactNode } from 'react';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { DisplaySubstitution } from './display-substitution.type';

const groupKeyContent = (
  key: string,
  field: FieldDescriptor | undefined,
  substitution?: DisplaySubstitution,
): ReactNode => {
  if (!key) return ABSENT_KEY_LABEL;
  if (!field || !KEY_RENDERED_KINDS.includes(field.kind)) return key;
  const kit = resolveFieldKit(field.kind);
  if (!kit) return key;
  return kit.renderCell(key, field, { display: substituteDisplay(key, field, substitution) });
};

export { groupKeyContent };
