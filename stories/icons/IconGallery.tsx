/* @layer stories @kind component */
import { Box, Icon, Text } from '../../src/primitives';
import type { IconName } from '../../src/primitives';
import './icons.stories.css';

interface IconGalleryProps {
  title: string;
  names: readonly IconName[];
}

const IconGallery = ({ title, names }: IconGalleryProps) => (
  <Box className="icon-gallery">
    <Text className="story-label">{`${title} (${names.length})`}</Text>
    <Box className="icon-gallery__grid">
      {names.map((name) => (
        <Box key={name} className="icon-gallery__cell">
          <Icon name={name} size={24} />
          <Text className="icon-gallery__name">{name}</Text>
        </Box>
      ))}
    </Box>
  </Box>
);

export { IconGallery };
