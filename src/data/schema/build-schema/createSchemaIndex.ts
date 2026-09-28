/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from '../field-descriptor';
import type { SchemaIndex } from './build-schema.type';

const flatten = (fields: readonly FieldDescriptor[], into: FieldDescriptor[]): FieldDescriptor[] => {
  for (const field of fields) {
    into.push(field);
    if (field.children) flatten(field.children, into);
  }
  return into;
};

const createSchemaIndex = (fields: readonly FieldDescriptor[]): SchemaIndex => {
  const flat = flatten(fields, []);
  const map = new Map(flat.map((field) => [field.path, field]));
  return {
    byPath: (path) => map.get(path),
    all: () => flat,
    roots: () => fields,
  };
};

export { createSchemaIndex };
