/* @layer renderer-components @kind component */
import { Box } from '../../Box';
import { splitPath } from '../behavior/split-path';
import type { PathFieldShownProps } from '../PathField.type';

const PathFieldShown = ({ path }: PathFieldShownProps) => {
  const { head, tail } = splitPath(path);
  return (
    <Box as="span" className="path-field__shown" aria-hidden>
      <Box as="span" className="path-field__head">{head}</Box>
      {tail && <Box as="span" className="path-field__tail">{tail}</Box>}
    </Box>
  );
};

export { PathFieldShown };
