/* @layer renderer-components @kind component */
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { emptyMessage } from './behavior/empty-message';
import { SearchResultsBody } from './sub-components/SearchResultsBody';
import type { SearchResultsProps } from './SearchResults.type';
import './SearchResults.css';

const SearchResults = (props: SearchResultsProps) => {
  const { query, count, jumps, idleMessage, emptyMessage: nothing } = props;
  const { navigation } = useTesseraStrings();
  const needle = query.trim();
  const message = emptyMessage({ needle, count, jumpCount: jumps?.length ?? 0, idleMessage, emptyMessage: nothing }, navigation);

  if (message !== null) return <EmptyState className="search-results__empty" message={message} />;
  return <SearchResultsBody {...props} needle={needle} />;
};

export { SearchResults };
