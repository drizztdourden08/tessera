/* @layer renderer-components @kind component */
import { EmptyState } from '../../primitives/EmptyState';
import { emptyMessage } from './behavior/empty-message';
import { IDLE_MESSAGE } from './SearchResults.constants';
import { SearchResultsBody } from './sub-components/SearchResultsBody';
import type { SearchResultsProps } from './SearchResults.type';
import './SearchResults.css';

const SearchResults = (props: SearchResultsProps) => {
  const { query, count, jumps, idleMessage = IDLE_MESSAGE, emptyMessage: nothing } = props;
  const needle = query.trim();
  const message = emptyMessage({ needle, count, jumpCount: jumps?.length ?? 0, idleMessage, emptyMessage: nothing });

  if (message !== null) return <EmptyState className="search-results__empty" message={message} />;
  return <SearchResultsBody {...props} needle={needle} />;
};

export { SearchResults };
