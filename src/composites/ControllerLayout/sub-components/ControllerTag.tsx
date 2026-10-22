/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { tagStyle } from '../behavior/tag-style';
import type { ControllerTagProps } from '../ControllerLayout.type';

const ControllerTag = (props: ControllerTagProps) => {
  const { place, state, active } = props;
  const content = state?.glyph ?? state?.label;
  if (content === undefined || content === null || content === '') return null;

  return (
    <Box
      as="span"
      className="controller-layout__tag"
      data-at={place.tag.at}
      data-kind={place.kind}
      data-active={active ? '' : undefined}
      style={tagStyle(place.tag)}
    >
      {content}
    </Box>
  );
};

export { ControllerTag };
