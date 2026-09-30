/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Button } from '../../../primitives/Button';
import { Span } from '../../../primitives/text-elements';
import type { SearchResultsSummaryProps } from './SearchResultsSummary.type';

const SearchResultsSummary = (props: SearchResultsSummaryProps) => {
  const { summary, jumps, onJump } = props;
  return (
    <Box className="search-results__summary">
      <Span tone="dim" className="search-results__count" role="status">{summary}</Span>
      {jumps.length > 0 && (
        <Box className="search-results__jumps">
          {jumps.map((jump) => (
            <Button key={jump.id} size="sm" variant="secondary" icon={jump.icon} onClick={() => onJump?.(jump.id)}>
              {jump.label}
            </Button>
          ))}
        </Box>
      )}
    </Box>
  );
};

export { SearchResultsSummary };
