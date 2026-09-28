/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { MouseCap } from '../../../primitives/Shortcut/sub-components/MouseCap';
import type { TourMouseProps } from './TourMouse.type';

const TourMouse = (props: TourMouseProps) => {
  const { button, pressed, ref } = props;
  return (
    <Box ref={ref} as="span" className={pressed ? 'shortcut-tour__mouse shortcut-tour__mouse--pressed' : 'shortcut-tour__mouse'}>
      <MouseCap button={button} />
    </Box>
  );
};

export { TourMouse };
