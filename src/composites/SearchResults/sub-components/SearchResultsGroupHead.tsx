/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { Text } from '../../../primitives/Text';
import { Span } from '../../../primitives/text-elements';
import type { SearchResultsGroupHeadProps } from './SearchResultsGroupHead.type';
import '../../../theme/icon-glow.css';

const SearchResultsGroupHead = (props: SearchResultsGroupHeadProps) => {
  const { group, openLabel, onOpenGroup } = props;
  return (
    <Box className="search-results__group-head">
      {group.icon != null && <Box as="span" className="search-results__group-icon icon-glow" aria-hidden="true">{group.icon}</Box>}
      <Text as="h3" className="search-results__group-title">{group.label}</Text>
      {group.count !== undefined && <Span className="search-results__group-count">{group.count}</Span>}
      {onOpenGroup && (
        <Pressable className="search-results__chip search-results__open" onClick={() => onOpenGroup(group.id)}>
          {openLabel}
        </Pressable>
      )}
    </Box>
  );
};

export { SearchResultsGroupHead };
