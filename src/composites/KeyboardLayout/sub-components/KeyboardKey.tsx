/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Keycap } from '../../../primitives/Shortcut/sub-components/Keycap';
import { cssVars } from '../behavior/css-vars';
import type { KeyboardKeyProps } from './KeyboardKey.type';

const KeyboardKey = (props: KeyboardKeyProps) => {
  const { placed, state } = props;
  const { id, face, x, y, w, h } = placed;
  return (
    <Box
      as="span"
      data-key-id={id}
      className={`keyboard-key keyboard-key--${state}`}
      style={cssVars({ '--key-x': x, '--key-y': y, '--key-w': w, '--key-h': h })}
    >
      <Keycap face={face} />
    </Box>
  );
};

export { KeyboardKey };
