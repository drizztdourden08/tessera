/* @layer renderer-components @kind component */
import { Box } from '../../../primitives/Box';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Text } from '../../../primitives/Text';
import type { PixelPlayerBarProps } from '../PixelPlayer.type';
import { PixelPlayerBarSpeed } from './PixelPlayerBarSpeed';
import { PixelPlayerBarTags } from './PixelPlayerBarTags';
import { PixelPlayerBarTransport } from './PixelPlayerBarTransport';

const PixelPlayerBar = (props: PixelPlayerBarProps) => {
  const { player, range, speeds, speed, onSpeed, tags, tagValue, onTag } = props;
  const { pixelPlayer } = useTesseraStrings();
  const count = range.to - range.from + 1;

  return (
    <Box className="pixel-player__bar" role="group" aria-label={pixelPlayer.controls}>
      <PixelPlayerBarTransport player={player} />
      {speeds.length > 1 ? <PixelPlayerBarSpeed speeds={speeds} speed={speed} onSpeed={onSpeed} /> : null}
      {tags.length > 0 ? <PixelPlayerBarTags tags={tags} value={tagValue} onChange={onTag} /> : null}
      <Text className="pixel-player__counter" variant="caption" numeric role="status" aria-live={player.playing ? 'off' : 'polite'}>
        {pixelPlayer.position(player.index - range.from + 1, count)}
      </Text>
    </Box>
  );
};

export { PixelPlayerBar };
