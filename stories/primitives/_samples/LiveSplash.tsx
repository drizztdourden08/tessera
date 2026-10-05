/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import type { LiveSplashProps } from './splash-states.type';
import './LiveSplash.css';

const LiveSplash = (props: LiveSplashProps) => {
  const { label, palette = 'archipelia', children } = props;
  return (
    <Box as="section" className="splash-frame live-splash" data-palette={palette} aria-label={label}>
      {children}
    </Box>
  );
};

export { LiveSplash };
