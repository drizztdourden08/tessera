/* @layer renderer-components @kind component */
import { Box, Shortcut } from '../../../primitives';
import type { TourMouseProps } from './TourMouse.type';

const TourMouse = (props: TourMouseProps) => {
  const { button, pressed, ref } = props;
  return (
    <Box ref={ref} as="span" className="shortcut-tour__mouse">
      <Shortcut mouse={button} state={pressed ? 'pressed' : 'idle'} fill />
    </Box>
  );
};

export { TourMouse };
