/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { rectStyle } from '../behavior/rect-style';
import type { DropPreviewProps } from './DropPreview.type';

const DropPreview = (props: DropPreviewProps) => {
  const { rect, refused } = props;
  return (
    <Box
      className={`dock-layout__preview${refused ? ' dock-layout__preview--refused' : ''}`}
      style={rectStyle(rect)}
      aria-hidden="true"
    />
  );
};

export { DropPreview };
