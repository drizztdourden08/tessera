/* @layer renderer-components @kind data */
import '../../theme/slider-thumb.css';
import './Slider.css';
import type { SliderProps } from './Slider.type';
import { useMuteToggle } from './behavior/useMuteToggle';
import { SliderHeader } from './sub-components/SliderHeader';
import { SliderMute } from './sub-components/SliderMute';

const Slider = (props: SliderProps) => {
  const {
    value,
    min,
    max,
    step = 1,
    onChange,
    label,
    description,
    disabled = false,
    showValue = true,
    formatValue = String,
    mute,
    onMuteToggle,
  } = props;

  const span = max - min;
  const pct = span > 0 ? ((value - min) / span) * 100 : 0;
  const handleMuteClick = useMuteToggle(value, onChange, onMuteToggle);

  return (
    <div className={`slider ${disabled ? 'slider--disabled' : ''}`}>
      <SliderHeader label={label} description={description} />
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
          style={{ '--slider-pct': `${pct}%` } as React.CSSProperties}
        />
        {showValue && <span className="slider__value">{formatValue(value)}</span>}
      </div>
    </div>
  );
};

export {
  Slider,
};
