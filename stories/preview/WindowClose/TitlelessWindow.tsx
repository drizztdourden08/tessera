/* @layer stories @kind component */
import { ScreenLayer } from '../../../src/composites';
import { Box } from '../../../src/primitives';
import type { TitlelessWindowProps } from './window-close.type';

const TitlelessWindow = (props: TitlelessWindowProps) => {
  const { title, onClose, floating, hidden, children } = props;
  return (
    <ScreenLayer onClose={onClose} floating={floating} hidden={hidden} label={title}>
      <Box className="screen-window window-close__window">
        <Box className="screen-window__content">{children}</Box>
      </Box>
    </ScreenLayer>
  );
};

export { TitlelessWindow };
