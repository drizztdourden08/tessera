/* @layer renderer-components @kind hook */
import { useMemo } from 'react';
import type { KeyboardEvent } from 'react';
import { toSchemaIndex } from '../../../data/schema/build-schema';
import { clauseFromToken } from './clause-from-token';
import { takeTokens } from './take-tokens';
import type { FilterTokenParser } from './take-tokens.type';
import type { UseTokenSearchInput, UseTokenSearchResult } from './useTokenSearch.type';

const useTokenSearch = (input: UseTokenSearchInput): UseTokenSearchResult => {
  const { search, onSearchChange, schema, clauses, onChange, parseToken } = input;
  const parse = useMemo<FilterTokenParser | undefined>(() => {
    if (parseToken === undefined || parseToken === false || schema === undefined) return undefined;
    if (typeof parseToken === 'function') return parseToken;
    const index = toSchemaIndex(schema);
    return (token) => clauseFromToken(index, token);
  }, [parseToken, schema]);

  const take = (query: string) => {
    if (parse === undefined || clauses === undefined || onChange === undefined) return { rest: query, found: false };
    const taken = takeTokens(query, parse);
    if (taken.clauses.length > 0) onChange([...clauses, ...taken.clauses]);
    return { rest: taken.rest, found: taken.clauses.length > 0 };
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
    if (event.key !== 'Enter') return;
    const { rest, found } = take(`${search} `);
    if (!found) return;
    event.preventDefault();
    onSearchChange(rest.trimEnd());
  };

  return { onSearchChange: (query) => onSearchChange(take(query).rest), onKeyDown };
};

export { useTokenSearch };
