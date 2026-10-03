/* @layer stories @kind component */
import { Box, INPUT_ICONS, InputIcon, Text } from '../../src/primitives';
import type { InputIconFamily, InputIconSource, InputIconTone } from '../../src/primitives';
import './icons.stories.css';

interface InputIconGalleryProps {
  family: InputIconFamily;
  title: string;
  tone: InputIconTone;
}

const sourcesOf = (family: InputIconFamily): InputIconSource[] =>
  Object.keys(INPUT_ICONS[family]).map((name) => ({ family, name }) as InputIconSource);

const InputIconGallery = (props: InputIconGalleryProps) => {
  const { family, title, tone } = props;
  const sources = sourcesOf(family);
  return (
    <Box className="icon-gallery">
      <Text className="story-label">{`${title}, family="${family}" (${sources.length})`}</Text>
      <Box className="icon-gallery__grid">
        {sources.map((source) => (
          <Box key={source.name} className="icon-gallery__cell">
            <InputIcon {...source} size={40} tone={tone} />
            <Text className="icon-gallery__name">{source.name}</Text>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export { InputIconGallery };
