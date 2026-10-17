/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Overlay } from '../../primitives/Overlay';
import { layerClass } from './behavior/layer-class';
import { placedStyle } from './behavior/placed-style';
import { useLayerEscape } from './behavior/useLayerEscape';
import { useLayerFocus } from './behavior/useLayerFocus';
import { useLayerMove } from './behavior/useLayerMove';
import { LayerMoveHandles } from './sub-components/LayerMoveHandles';
import type { ScreenLayerProps } from './ScreenLayer.type';
import './ScreenLayer.css';

const ScreenLayer = (props: ScreenLayerProps) => {
  const { children, onClose, floating, corner, move, hidden = false, label, labelledBy, className = '' } = props;
  const focus = useLayerFocus(!hidden, labelledBy);
  useLayerEscape(hidden ? null : focus.node, onClose);
  const moving = useLayerMove(move, focus.node);

  return (
    <Overlay ref={focus.layerRef} visible tone="clear" className={layerClass(props, moving)}>
      <Box className="screen-layer__inset">
        <Box
          ref={focus.ref}
          className="screen-layer__frame"
          role="dialog"
          aria-modal="true"
          aria-label={label}
          aria-labelledby={labelledBy}
          tabIndex={-1}
          style={placedStyle(moving.placed)}
          onKeyDown={focus.onKeyDown}
        >
          {floating != null && <Box className="screen-layer__floating">{floating}</Box>}
          {corner != null && <Box className="screen-layer__corner">{corner}</Box>}
          {move && <LayerMoveHandles {...moving} />}
          <Box className={`screen-layer__card${className ? ` ${className}` : ''}`}>
            {children}
          </Box>
        </Box>
      </Box>
    </Overlay>
  );
};

export { ScreenLayer };
