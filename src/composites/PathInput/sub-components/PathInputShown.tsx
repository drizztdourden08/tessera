/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { splitPath } from '../behavior/split-path';
import type { PathInputShownProps } from '../PathInput.type';

const PathInputShown = ({ path }: PathInputShownProps) => {
  const { head, tail } = splitPath(path);
  return (
    <Box as="span" className="path-input__shown" aria-hidden>
      <Box as="span" className="path-input__head">{head}</Box>
      {tail && <Box as="span" className="path-input__tail">{tail}</Box>}
    </Box>
  );
};

export { PathInputShown };
