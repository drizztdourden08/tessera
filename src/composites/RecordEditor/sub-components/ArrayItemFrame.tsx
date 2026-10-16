/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Flex } from '../../../primitives/Flex';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Span } from '../../../primitives/text-elements';
import type { ArrayItemFrameProps } from './ArrayItemFrame.type';

const ArrayItemFrame = (props: ArrayItemFrameProps) => {
  const { index, controls, children } = props;
  const { records } = useTesseraStrings();

  return (
    <Box surface="sunken" className="record-editor__array-item">
      <Flex className="record-editor__array-item-head" gap="xs" align="center">
        <Span tone="muted" className="record-editor__array-index">{records.itemPosition(index + 1)}</Span>
        {controls}
      </Flex>
      {children}
    </Box>
  );
};

export { ArrayItemFrame };
