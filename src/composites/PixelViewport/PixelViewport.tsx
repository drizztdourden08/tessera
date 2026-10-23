/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import { Canvas } from '../../primitives/Canvas';
import { Text } from '../../primitives/Text';
import { useTesseraStrings } from '../../primitives/TesseraProvider/behavior/useTesseraStrings';
import { usePixelViewport } from './behavior/usePixelViewport';
import type { PixelViewportProps } from './PixelViewport.type';
import '../../theme/focus-ring.css';
import '../../theme/visually-hidden.css';
import './PixelViewport.css';

const PixelViewport = (props: PixelViewportProps) => {
  const { label, className } = props;
  const { pixelViewport } = useTesseraStrings();
  const viewport = usePixelViewport(props);
  return (
    <Box
      ref={viewport.rootRef}
      className={className ? `pixel-viewport focus-ring-inset ${className}` : 'pixel-viewport focus-ring-inset'}
      tabIndex={0}
      role="application"
      aria-label={label}
      aria-roledescription={pixelViewport.role}
      {...viewport.handlers}
    >
      <Canvas ref={viewport.canvasRef} className="pixel-viewport__canvas" aria-hidden="true" />
      <Text as="span" className="visually-hidden" aria-live="polite">{viewport.announcement}</Text>
    </Box>
  );
};

export { PixelViewport };
