/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import type { SliderMuteProps } from './SliderMute.type';

const SliderMute = (props: SliderMuteProps) => {
  const { mute, disabled, onClick } = props;
  const { common } = useTesseraStrings();
  return (
    <button
      type="button"
      className={`slider__mute ${mute ? 'slider__mute--muted' : ''}`}
      onClick={onClick}
      aria-label={mute ? common.unmute : common.mute}
      disabled={disabled}
    >
      <Glyph name={mute ? 'mute' : 'volume'} />
    </button>
  );
};

export { SliderMute };
