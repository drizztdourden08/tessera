/* @layer renderer-components @kind component */
import { useRef } from 'react';
import type { KeyboardEvent } from 'react';
import { Box } from '../../../primitives/Box';
import { Canvas } from '../../../primitives/Canvas';
import { Icon } from '../../../primitives/Icon';
import { useTesseraStrings } from '../../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { Text } from '../../../primitives/Text';
import { playerKeyAction } from '../behavior/player-key-action';
import { useHoveredCell } from '../behavior/useHoveredCell';
import { useStageDraw } from '../behavior/useStageDraw';
import { useStageSize } from '../behavior/useStageSize';
import { zoomOf } from '../behavior/zoom-of';
import type { PixelPlayerStageProps } from '../PixelPlayer.type';

const PixelPlayerStage = (props: PixelPlayerStageProps) => {
  const { frames, image, label, zoom, backdrop, showZoom, cells, onCellHover, onKeyAction, placeholder } = props;
  const { pixelPlayer } = useTesseraStrings();
  const stageRef = useRef<HTMLElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stage = useStageSize(stageRef);
  const scale = zoomOf({ zoom, stage, frames });
  const hover = useHoveredCell({ cells, zoom: scale, canvasRef, onCellHover });
  useStageDraw({ canvasRef, image, zoom: scale, cell: hover.cell });
  const onKeyDown = (event: KeyboardEvent) => {
    const action = playerKeyAction(event.key);
    if (!action) return;
    event.preventDefault();
    onKeyAction(action);
  };

  return (
    <Box className="pixel-player__view">
      <Box ref={stageRef} className="pixel-player__stage" role="group" aria-label={label} tabIndex={0} onKeyDown={onKeyDown}>
        {image ? (
          <Canvas
            ref={canvasRef}
            className={backdrop === 'checker' ? 'pixel-player__canvas pixel-player__canvas--checker' : 'pixel-player__canvas'}
            role="img"
            aria-label={label}
            onPointerMove={hover.onPointerMove}
            onPointerLeave={hover.onPointerLeave}
          />
        ) : (
          <Box className="pixel-player__empty">{placeholder ?? <Icon name="image" size={32} />}</Box>
        )}
      </Box>
      {showZoom && image ? <Text className="pixel-player__zoom" variant="caption" numeric>{pixelPlayer.zoom(scale)}</Text> : null}
      {hover.cell?.label ? <Text className="pixel-player__caption" variant="caption">{hover.cell.label}</Text> : null}
    </Box>
  );
};

export { PixelPlayerStage };
