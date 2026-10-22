/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import type { ControllerHeldProps } from '../ControllerLayout.type';
import '../../../theme/visually-hidden.css';

const ControllerHeld = (props: ControllerHeldProps) => {
  const { lines, label, empty } = props;

  return (
    <Box as="ul" className="visually-hidden" aria-label={label}>
      {lines.length === 0 ? <Box as="li">{empty}</Box> : lines.map((line, index) => <Box as="li" key={index}>{line}</Box>)}
    </Box>
  );
};

export { ControllerHeld };
