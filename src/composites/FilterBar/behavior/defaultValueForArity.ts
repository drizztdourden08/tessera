/* @layer renderer-components @kind logic */
import type { Arity } from './filter-clause-defaults.type';

const defaultValueForArity = (arity: Arity): unknown => (arity === 'many' ? [] : null);

export { defaultValueForArity };
