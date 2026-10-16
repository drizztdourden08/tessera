/* @layer renderer-components @kind component */
import { Box } from '../Box';
import { backdropStyle } from './behavior/backdrop-style';
import type { BackdropLayerProps } from './BackdropLayer.type';
import './BackdropLayer.css';

const BackdropLayer = (props: BackdropLayerProps) => {
  const { backdrop, className } = props;
  const image = backdrop.kind === 'image' ? backdrop : null;
  const classes = ['backdrop-layer', `backdrop-layer--${backdrop.kind}`, image?.pixelated === true && 'backdrop-layer--pixelated', className]
    .filter(Boolean)
    .join(' ');
  if (backdrop.kind === 'node') return <Box className={classes} aria-hidden="true">{backdrop.node}</Box>;
  return (
    <Box
      className={classes}
      data-fit={image === null ? undefined : image.fit ?? 'cover'}
      style={backdropStyle(backdrop)}
      aria-hidden="true"
    />
  );
};

export { BackdropLayer };
