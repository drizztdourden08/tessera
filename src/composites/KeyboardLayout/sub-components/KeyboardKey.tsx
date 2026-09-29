/* @layer renderer-components @kind component */
import { Box, Shortcut } from '../../../primitives';
import { cssVars } from '../behavior/css-vars';
import type { KeyboardKeyProps } from './KeyboardKey.type';

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { placed, state } = props;
  const { id, key, x, y, w, h } = placed;
  return (
    <Box
      as="span"
      data-key-id={id}
      className="keyboard-key"
      style={cssVars({ '--key-x': x, '--key-y': y, '--key-w': w, '--key-h': h })}
    >
      <Shortcut keys={key} state={state} fill className="keyboard-key__cap" />
    </Box>
  );
};

export { KeyboardKey };
