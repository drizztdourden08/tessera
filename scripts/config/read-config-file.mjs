/* @layer tooling-scripts @kind logic */
import { readFileSync } from 'node:fs';
import { SCHEMA_FILE } from './config.constants.mjs';
import { schemaErrors } from './schema-errors.mjs';

const parse = (file) => {
  try {
    return JSON.parse(readFileSync(file, 'utf8'));
  } catch (error) {
    throw new Error(`${file}: not valid JSON. ${error instanceof Error ? error.message : String(error)}`, { cause: error });
  }
};

const readConfigFile = (file) => {
  const raw = parse(file);
  const schema = JSON.parse(readFileSync(SCHEMA_FILE, 'utf8'));
  const errors = schemaErrors(raw, schema, schema);
  if (errors.length > 0) throw new Error(`${file}:\n  ${errors.join('\n  ')}`);
  return raw;
};

export { readConfigFile };
