/* @layer renderer-components @kind component */
import { Icon } from '../../../primitives/Icon';
import { IconButton } from '../../../primitives/IconButton';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { playFace } from '../behavior/play-face';
import { PLAY_ICONS } from '../PixelPlayer.constants';
import type { PixelPlayerBarTransportProps } from '../PixelPlayer.type';

const PixelPlayerBarTransport = (props: PixelPlayerBarTransportProps) => {
  const { player } = props;
  const { common, pixelPlayer } = useTesseraStrings();
  const face = playFace(player);
  const labels = { replay: pixelPlayer.replay, pause: common.pause, play: common.play };

  return (
    <>
      <IconButton size="sm" variant="ghost" label={pixelPlayer.stepBack} onClick={() => player.step(-1)}>
        <Icon name="pixel-frame-prev" size={16} />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={labels[face]} onClick={player.toggle}>
        <Icon name={PLAY_ICONS[face]} size={16} />
      </IconButton>
      <IconButton size="sm" variant="ghost" label={pixelPlayer.stepForward} onClick={() => player.step(1)}>
        <Icon name="pixel-frame-next" size={16} />
      </IconButton>
    </>
  );
};

export { PixelPlayerBarTransport };
