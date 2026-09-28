/* @layer renderer-components @kind logic */
import { kits } from './kits';
import type { FieldTypeStrategy } from './registry.type';

const registerFieldKit = (strategy: FieldTypeStrategy): void => {
  kits.set(strategy.kind, strategy);
};

export { registerFieldKit };
export type { IdRefOptionResolver } from './registry.type';
