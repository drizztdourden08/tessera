/* @layer renderer-components @kind logic */
import { createSchemaIndex } from './create-schema-index';
import type { SchemaIndex, SchemaLike } from './build-schema.type';

const isSchemaIndex = (schema: SchemaLike): schema is SchemaIndex =>
  !Array.isArray(schema) && typeof (schema as SchemaIndex).byPath === 'function';

const toSchemaIndex = (schema: SchemaLike): SchemaIndex =>
  isSchemaIndex(schema) ? schema : createSchemaIndex(schema);

export { toSchemaIndex };
