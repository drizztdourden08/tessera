/* @layer renderer-components @kind component */
import { Select } from '../../../primitives/Select';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { ALL_FRAMES } from '../PixelPlayer.constants';
import type { PixelPlayerBarTagsProps } from '../PixelPlayer.type';

const PixelPlayerBarTags = (props: PixelPlayerBarTagsProps) => {
  const { tags, value, onChange } = props;
  const { pixelPlayer } = useTesseraStrings();
  const options = [{ value: ALL_FRAMES, label: pixelPlayer.allFrames }, ...tags.map((tag) => ({ value: tag.id, label: tag.name }))];

  return (
    <Select
      aria-label={pixelPlayer.range}
      size="sm"
      options={options}
      value={value ?? ALL_FRAMES}
      onChange={(choice) => onChange(choice === ALL_FRAMES ? null : choice)}
    />
  );
};

export { PixelPlayerBarTags };
