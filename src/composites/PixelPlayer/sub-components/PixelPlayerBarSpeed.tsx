/* @layer renderer-components @kind component */
import { SegmentedControl } from '../../../primitives/SegmentedControl';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import type { PixelPlayerBarSpeedProps } from '../PixelPlayer.type';

const PixelPlayerBarSpeed = (props: PixelPlayerBarSpeedProps) => {
  const { speeds, speed, onSpeed } = props;
  const { pixelPlayer } = useTesseraStrings();
  const options = speeds.map((choice) => ({ value: String(choice), label: pixelPlayer.speedOption(choice) }));

  return <SegmentedControl aria-label={pixelPlayer.speed} size="sm" value={String(speed)} options={options} onChange={(value) => onSpeed(Number(value))} />;
};

export { PixelPlayerBarSpeed };
