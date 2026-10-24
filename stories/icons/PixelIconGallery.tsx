/* @layer stories @kind component */
import { Box, Icon, Text } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import { PIXEL_ICON_SIZES } from './pixel-icon-guide.constants';
import './icons.stories.css';

interface PixelIconGalleryProps {
  names: readonly IconName[];
}

const PixelIconGallery = ({ names }: PixelIconGalleryProps) => (
  <Box className="icon-gallery">
    <Text className="story-label">{`Pixel set (${names.length}) at ${PIXEL_ICON_SIZES.join(', ')} px`}</Text>
    <Box className="icon-gallery__grid">
      {names.map((name) => (
        <Box key={name} className="icon-gallery__cell">
          <Box className="icon-gallery__sizes">
            {PIXEL_ICON_SIZES.map((size) => <Icon key={size} name={name} size={size} />)}
          </Box>
          <Text className="icon-gallery__name">{name}</Text>
        </Box>
      ))}
    </Box>
  </Box>
);

export { PixelIconGallery };
