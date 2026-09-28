/* @layer renderer-components @kind types */
interface FilterSuggestionsParams {
  suggestions: readonly string[];
  query: string;
  selected: readonly string[];
  limit?: number;
}

export type { FilterSuggestionsParams };
