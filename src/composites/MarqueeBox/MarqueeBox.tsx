/* @layer renderer-components @kind component */
import { Box } from '../../primitives/Box';
import type { CSSProperties } from 'react';
import type { MarqueeBoxProps } from './MarqueeBox.type';
import './MarqueeBox.css';

const MarqueeBox = (props: MarqueeBoxProps) => {
  const { rect } = props;
  if (rect === null) return null;
  const placed = {
    '--mq-x': `${rect.x}px`,
    '--mq-y': `${rect.y}px`,
    '--mq-w': `${rect.width}px`,
    '--mq-h': `${rect.height}px`,
  } as CSSProperties;
  return <Box className="marquee-box" style={placed} aria-hidden="true" />;
};

export { MarqueeBox };
