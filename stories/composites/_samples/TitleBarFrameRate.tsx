/* @layer stories @kind component */
import { useEffect, useState } from 'react';
import { WindowTitleBar } from '../../../src/composites';
import type { MenuGroup, WindowTitleBarAction } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { FRAME_RATE_EVERY_MS, FRAME_RATES } from './title-bar-frame-rate.constants';

interface TitleBarFrameRateProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
}

const ignore = () => undefined;

const TitleBarFrameRate = (props: TitleBarFrameRateProps) => {
  const { title, logo, menu } = props;
  const [reading, setReading] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setReading((count) => count + 1), FRAME_RATE_EVERY_MS);
    return () => window.clearInterval(timer);
  }, []);
  const fps = FRAME_RATES[reading % FRAME_RATES.length];
  const actions: WindowTitleBarAction[] = [
    { id: 'search', icon: 'search', label: 'Search', onSelect: ignore },
    { id: 'frame-rate', icon: 'monitor', label: 'Frame rate', bar: 'status', status: `${fps} FPS (120 Hz)`, onSelect: ignore },
    { id: 'report-bug', icon: 'bug', label: 'Report a bug', tone: 'danger', effect: 'ping', onSelect: ignore },
  ];
  return (
    <Box className="story-column">
      <Text variant="caption">The frame rate changes twice a second and swells each time. Its digits share one width, so the bug button beside it stays put.</Text>
      <Box className="window-title-bar-story__strip window-title-bar-story__strip--720">
        <WindowTitleBar title={title} logo={logo} menu={menu} actions={actions} onControl={ignore} />
      </Box>
    </Box>
  );
};

export { TitleBarFrameRate };
