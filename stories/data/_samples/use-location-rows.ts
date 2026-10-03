/* @layer stories @kind hook */
import { useMemo } from 'react';
import { buildSchema, compile, compileTextSearch } from '../../../src/data';
import type { FilterClause } from '../../../src/data';
import { LOCATIONS, LOCATION_CONFIG } from './data-locations';
import type { LocationRow } from './data-locations';

const SCHEMA = buildSchema(LOCATIONS, LOCATION_CONFIG);

const useLocationRows = (clauses: readonly FilterClause[], search: string): readonly LocationRow[] =>
  useMemo(() => {
    const matches = compile(clauses, SCHEMA);
    const text = compileTextSearch(search);
    return LOCATIONS.filter((row) => matches(row) && (!text || text(row)));
  }, [clauses, search]);

export { useLocationRows };
