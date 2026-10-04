/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { ScreenLayerProps } from './ScreenLayer.type';
import './ScreenLayer.css';

const ScreenLayer = (props: ScreenLayerProps) => {
  const { children, floating, hidden = false, size = 'fill', square = false, label, labelledBy, className = '' } = props;
  const classes = ['screen-layer', `screen-layer--${size}`, hidden ? 'screen-layer--hidden' : '', square ? 'screen-layer--square' : ''].filter(Boolean).join(' ');

  return (
    <Box className={classes}>
      <Box className="screen-layer__inset">
        <Box className="screen-layer__frame">
          {floating != null && <Box className="screen-layer__floating">{floating}</Box>}
          <Box
            className={`screen-layer__card${className ? ` ${className}` : ''}`}
            role="dialog"
            aria-modal="true"
            aria-label={label}
            aria-labelledby={labelledBy}
          >
            {children}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export { ScreenLayer };
