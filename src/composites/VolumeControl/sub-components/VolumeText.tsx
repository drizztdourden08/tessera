/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { Small, Span } from '../../../primitives/text-elements';
import type { VolumeTextProps } from './VolumeText.type';

const VolumeText = (props: VolumeTextProps) => {
  const { label, description } = props;
  if (!label && !description) return null;
  return (
    <Box className="volume-control__text">
      {label && <Span className="volume-control__label">{label}</Span>}
      {description && <Small tone="dim">{description}</Small>}
    </Box>
  );
};

export { VolumeText };
