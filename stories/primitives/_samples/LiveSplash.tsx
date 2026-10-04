/* @layer stories @kind component */
import { Box } from '../../../src/primitives';
import type { LiveSplashProps } from './splash-states.type';
import './LiveSplash.css';

const LiveSplash = (props: LiveSplashProps) => {
  const { label, children } = props;
  return (
    <Box as="section" className="splash-frame live-splash" data-palette="archipelia" aria-label={label}>
      {children}
    </Box>
  );
};

export { LiveSplash };
