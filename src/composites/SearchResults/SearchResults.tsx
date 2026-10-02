/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { EmptyState } from '../../primitives/EmptyState';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { SearchSpark } from '../SearchSpark';
import { IDLE_ICON_SIZE } from './SearchResults.constants';
import { SearchResultsBody } from './sub-components/SearchResultsBody';
import type { SearchResultsProps } from './SearchResults.type';
import '../../theme/page-card.css';
import './SearchResults.css';

const SearchResults = (props: SearchResultsProps) => {
  const { query, framed = false, idleIcon = <SearchSpark size={IDLE_ICON_SIZE} />, idleMessage, className = '' } = props;
  const { navigation } = useTesseraStrings();
  const needle = query.trim();
  const idle = needle === '';
  const classes = ['search-results', framed ? 'search-results--framed page-card' : '', idle ? 'search-results--idle' : '', className]
    .filter(Boolean).join(' ');

  return (
    <Box as="section" className={classes} aria-label={navigation.searchResults}>
      {idle
        ? <EmptyState className="search-results__empty" icon={idleIcon} message={idleMessage ?? navigation.typeToSearch} />
        : <SearchResultsBody {...props} needle={needle} />}
    </Box>
  );
};

export { SearchResults };
