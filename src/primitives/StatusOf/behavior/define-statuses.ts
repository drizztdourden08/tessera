/* @layer renderer-components @kind util */
import type { StatusDef } from '../StatusOf.type';

const defineStatuses = <const Defs extends Record<string, StatusDef>>(defs: Defs): Readonly<Defs> => Object.freeze(defs);

export { defineStatuses };
