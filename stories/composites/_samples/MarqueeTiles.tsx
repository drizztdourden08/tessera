/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { MarqueeBox, MARQUEE_KEY_ATTRIBUTE, useMarqueeSelect } from '../../../src/composites';
import { Box, Text } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';

interface MarqueeTilesProps {
  count: number;
  enabled?: boolean;
  autoScroll?: boolean;
}

const ITEM_SELECTOR = `[${MARQUEE_KEY_ATTRIBUTE}]`;

const MarqueeTiles = (props: MarqueeTilesProps) => {
  const { count, enabled = true, autoScroll = true } = props;
  const areaRef = useRef<HTMLElement>(null);
  const [picked, setPicked] = useState<readonly string[]>([]);
  const marquee = useMarqueeSelect({ containerRef: areaRef, itemSelector: ITEM_SELECTOR, selected: picked, onChange: setPicked, enabled, autoScroll });
  const tiles = Array.from({ length: count }, (_, at) => `tile-${at + 1}`);
  return (
    <ValueReadout value={`${picked.length} picked`}>
      <Box ref={areaRef} className="marquee-story" role="listbox" aria-multiselectable="true" aria-label="Tiles" {...marquee.bind}>
        {tiles.map((key) => (
          <Box
            key={key}
            role="option"
            className="marquee-story__tile"
            aria-selected={picked.includes(key)}
            {...{ [MARQUEE_KEY_ATTRIBUTE]: key }}
          >
            <Text>{key.replace('tile-', '')}</Text>
          </Box>
        ))}
        <MarqueeBox rect={marquee.rect} />
      </Box>
    </ValueReadout>
  );
};

export { MarqueeTiles };
