/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { guideStyle } from '../behavior/guide-style';
import type { SnapGuidesProps } from './SnapGuides.type';

const SnapGuides = (props: SnapGuidesProps) =>
  props.guides.map((guide) => (
    <Box
      key={`${guide.axis}-${guide.at}`}
      className={`dock-snap-guide dock-snap-guide--${guide.axis}`}
      style={guideStyle(guide)}
      data-snap-guide={guide.axis}
      aria-hidden="true"
    />
  ));

export { SnapGuides };
