/* @layer stories @kind component */
import type { ReactNode } from 'react';
import { WindowTitleBar } from '../../../src/composites';
import type { MenuGroup } from '../../../src/composites';
import { Box } from '../../../src/primitives';

interface TitleBarWidthsProps {
  title: string;
  logo: string;
  menu: readonly MenuGroup[];
  left: ReactNode;
}

const WIDTHS = ['wide', 'medium', 'narrow', 'tiny'] as const;

const ignore = () => undefined;

const TitleBarWidths = (props: TitleBarWidthsProps) => (
  <Box className="story-column">
    {WIDTHS.map((width) => (
      <Box key={width} className={`window-title-bar-story__strip window-title-bar-story__strip--${width}`}>
        <WindowTitleBar title={props.title} logo={props.logo} menu={props.menu} left={props.left} onControl={ignore} />
      </Box>
    ))}
  </Box>
);

export { TitleBarWidths };
