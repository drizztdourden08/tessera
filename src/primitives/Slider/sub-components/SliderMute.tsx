/* @layer renderer-components @kind component */
import { Glyph } from '../../Glyph';
import type { SliderMuteProps } from './SliderMute.type';

const SliderMute = (props: SliderMuteProps) => {
  const { mute, disabled, onClick } = props;
  return (
    <button
      type="button"
      className={`slider__mute ${mute ? 'slider__mute--muted' : ''}`}
      onClick={onClick}
      aria-label={mute ? 'Unmute' : 'Mute'}
      disabled={disabled}
    >
      <Glyph name={mute ? 'mute' : 'volume'} />
    </button>
  );
};

export { SliderMute };
