/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Shortcut } from '../../../primitives/Shortcut';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';

const CommandKeyHints = ({ id, completes }: { id: string; completes: boolean }) => {
  const { common } = useTesseraStrings();
  return (
    <Box as="span" id={id} className="command-input__keys">
      {completes && <Shortcut keys="tab" size="xs" />}
      {completes && <Box as="span" className="command-input__key-text">{common.complete}</Box>}
      <Shortcut keys="up" legend="symbol" size="xs" />
      <Shortcut keys="down" legend="symbol" size="xs" />
      <Box as="span" className="command-input__key-text">{common.history}</Box>
      <Shortcut keys="esc" size="xs" />
      <Box as="span" className="command-input__key-text">{common.clear}</Box>
    </Box>
  );
};

export { CommandKeyHints };
