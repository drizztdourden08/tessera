/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Pressable } from '../../primitives/Pressable';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../primitives/text-elements';
import type { SearchResultGroupProps } from './SearchResultGroup.type';
import '../../theme/icon-glow.css';
import '../../theme/search-chip.css';
import './SearchResultGroup.css';

const SearchResultGroup = (props: SearchResultGroupProps) => {
  const { label, id, icon, count, onOpen, openLabel, children, className = '' } = props;
  const { navigation } = useTesseraStrings();
  return (
    <Box as="section" className={`search-result-group${className ? ` ${className}` : ''}`} data-group={id} aria-label={label}>
      <Box className="search-result-group__head">
        {icon != null && <Box as="span" className="search-result-group__icon icon-glow" aria-hidden="true">{icon}</Box>}
        <Text as="h3" className="search-result-group__title">{label}</Text>
        {count !== undefined && <Span className="search-result-group__count">{count}</Span>}
        {onOpen && <Pressable className="search-result-group__open search-chip" onClick={onOpen}>{openLabel ?? navigation.openPage}</Pressable>}
      </Box>
      {children}
    </Box>
  );
};

export { SearchResultGroup };
