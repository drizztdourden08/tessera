/* @layer renderer-components @kind component */
import { useId } from 'react';
import { Icon } from '../../Icon';
import { IconButton } from '../../IconButton';
import { useTesseraStrings } from '../../TesseraProvider/behavior/useTesseraStrings';
import { rateLabel } from '../behavior/rate-label';
import { useRateMenu } from '../behavior/useRateMenu';
import { PLAYBACK_RATES } from '../Video.constants';
import '../../../theme/focus-ring.css';
import './VideoRateMenu.css';
import type { VideoRateMenuProps } from './VideoRateMenu.type';

const VideoRateMenu = (props: VideoRateMenuProps) => {
  const { rate, onRate } = props;
  const menuId = useId();
  const { video } = useTesseraStrings();
  const { open, rootRef, menuRef, toggle, choose, handleMenuKeyDown } = useRateMenu(onRate);

  return (
    <div ref={rootRef} className="video-rate">
      <IconButton
        className="video-bar__button video-rate__trigger"
        label={video.playbackSpeedAt(rateLabel(rate))}
        aria-haspopup="menu"
        aria-expanded={open}
        aria-controls={open ? menuId : undefined}
        onClick={toggle}
      >
        {rateLabel(rate)}
      </IconButton>
      {open && (
        <div ref={menuRef} id={menuId} role="menu" aria-label={video.playbackSpeed} className="video-rate__menu" onKeyDown={handleMenuKeyDown}>
          {PLAYBACK_RATES.map((value) => (
            <button
              key={value}
              type="button"
              role="menuitemradio"
              aria-checked={value === rate}
              tabIndex={value === rate ? 0 : -1}
              className="video-rate__item focus-ring-inset"
              onClick={() => choose(value)}
            >
              {rateLabel(value)}
              {value === rate && <Icon name="check" size={14} />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export { VideoRateMenu };
