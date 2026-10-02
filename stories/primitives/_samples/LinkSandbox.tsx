/* @layer stories @kind component */
import { useState } from 'react';
import type { MouseEvent } from 'react';
import { Box, Text } from '../../../src/primitives';
import type { LinkSandboxProps } from './LinkSandbox.type';

const leftToBrowser = (event: MouseEvent<HTMLElement>): boolean =>
  event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey;

const LinkSandbox = (props: LinkSandboxProps) => {
  const { children } = props;
  const [last, setLast] = useState('');
  const watch = (event: MouseEvent<HTMLElement>) => {
    const anchor = (event.target as Element).closest('a');
    if (!anchor || anchor.target === '_blank' || leftToBrowser(event)) return;
    event.preventDefault();
    setLast(`The browser would load ${anchor.getAttribute('href') ?? ''}`);
  };
  return (
    <Box className="story-column" onClick={watch}>
      {children}
      {last && <Text className="story-label">{last}</Text>}
    </Box>
  );
};

export { LinkSandbox };
