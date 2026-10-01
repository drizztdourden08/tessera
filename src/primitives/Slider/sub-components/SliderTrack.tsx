/* @layer renderer-components @kind component */
import type { CSSProperties } from 'react';
import { Span } from '../../text-elements';
import { useMuteToggle } from '../behavior/useMuteToggle';
import { SliderMute } from './SliderMute';
import type { SliderTrackProps } from './SliderTrack.type';

const SliderTrack = (props: SliderTrackProps) => {
  const { value, min, max, step = 1, onChange, disabled = false, showValue = true, formatValue = String, mute, onMuteToggle, name } = props;
  const span = max - min;
  const pct = span > 0 ? ((value - min) / span) * 100 : 0;
  const handleMuteClick = useMuteToggle(value, onChange, onMuteToggle);

  return (
    <div className="slider__track">
      {mute != null && <SliderMute mute={mute} disabled={disabled} onClick={handleMuteClick} />}
      <input
        type="range"
        className="slider__input"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        disabled={disabled}
        aria-label={name}
        style={{ '--slider-pct': `${pct}%` } as CSSProperties}
      />
      {showValue && <Span tone="primary" className="slider__value">{formatValue(value)}</Span>}
    </div>
  );
};

export { SliderTrack };
