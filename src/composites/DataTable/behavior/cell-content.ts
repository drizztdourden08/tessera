/* @layer renderer-components @kind logic */
import { resolveFieldKit } from '../../field-kits';
import { getPath } from '../../../data/schema/path';
import { substituteDisplay } from './display-substitution';
import type { ReactNode } from 'react';
import type { FieldDescriptor } from '../../../data/schema/field-descriptor';
import type { DisplaySubstitution } from './display-substitution.type';

const stringify: (value: unknown) => string | undefined = JSON.stringify;

const asText = (value: unknown): string => {
  if (value === undefined || value === null) return '';
  if (typeof value === 'string') return value;
  return stringify(value) ?? '';
};

const cellContent = (
  row: unknown,
  path: string,
  field: FieldDescriptor | undefined,
  substitution?: DisplaySubstitution,
): ReactNode => {
  const value = getPath(row, path);
  if (!field) return asText(value);
  const kit = resolveFieldKit(field.kind);
  if (!kit) return asText(value);
  return kit.renderCell(value, field, {
    display: substituteDisplay(value, field, substitution),
    resolveIdRefDisplay: substitution?.resolveDefault,
  });
};

export { cellContent };
