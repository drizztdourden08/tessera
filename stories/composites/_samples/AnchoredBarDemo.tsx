/* @layer stories @kind component */
import { useRef } from 'react';
import { AnchoredBar } from '../../../src/composites';
import type { AnchoredBarProps } from '../../../src/composites';
import { Box, Button, Text } from '../../../src/primitives';
import './AnchoredBarDemo.css';

type AnchoredBarDemoProps = Partial<Omit<AnchoredBarProps, 'anchorRect' | 'boundary' | 'subscribe'>> & { label?: string };

const AnchoredBarDemo = (props: AnchoredBarDemoProps) => {
  const { label = 'Edit selection', ...rest } = props;
  const frame = useRef<HTMLElement | null>(null);
  const target = useRef<HTMLElement | null>(null);
  const rect = () => target.current?.getBoundingClientRect() ?? null;
  const subscribe = (notify: () => void) => {
    const node = frame.current;
    node?.addEventListener('scroll', notify);
    return () => node?.removeEventListener('scroll', notify);
  };
  return (
    <Box ref={frame} className="bar-demo">
      <Box className="bar-demo__page">
        <Box ref={target} className="bar-demo__target" />
        <AnchoredBar anchorRect={rect} boundary={frame} subscribe={subscribe} inline label={label} {...rest}>
          <Text as="span">Rename</Text>
          <Button size="sm" variant="secondary">Apply</Button>
        </AnchoredBar>
      </Box>
    </Box>
  );
};

export { AnchoredBarDemo };
