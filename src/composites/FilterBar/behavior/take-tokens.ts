/* @layer renderer-components @kind logic */
import type { FilterClause } from '../../../data/filter/clause';
import { WORD_THEN_SPACE } from './take-tokens.constants';
import type { FilterTokenParser, TokensTaken } from './take-tokens.type';

const takeTokens = (query: string, parse: FilterTokenParser): TokensTaken => {
  const clauses: FilterClause[] = [];
  const rest = query.replace(WORD_THEN_SPACE, (whole: string, word: string) => {
    const clause = word.includes(':') ? parse(word) : null;
    if (clause === null) return whole;
    clauses.push(clause);
    return '';
  });
  return { rest, clauses };
};

export { takeTokens };
