/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Pressable } from '../../../primitives/Pressable';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import type { SearchResultsHeadProps } from './SearchResultsHead.type';

const SearchResultsHead = (props: SearchResultsHeadProps) => {
  const { summary, jumps, onJump } = props;
  const { navigation } = useTesseraStrings();
  return (
    <Box as="header" className="search-results__head">
      <Span className="search-results__summary" role="status">{summary}</Span>
      {jumps.length > 0 && (
        <Box className="search-results__jumps">
          {jumps.map((jump) => (
            <Pressable key={jump.id} className="search-results__chip" onClick={() => onJump?.(jump.id)}>
              {jump.icon}
              {navigation.openNamed(jump.label)}
            </Pressable>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { SearchResultsHead };
