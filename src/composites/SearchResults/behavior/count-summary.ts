/* @layer renderer-components @kind logic */
const countSummary = (count: number, query: string): string =>
  `${count} ${count === 1 ? 'result' : 'results'} for "${query}"`;

export { countSummary };
