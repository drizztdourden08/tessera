/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { Anchored, Box, Button, ButtonRow, ScrollArea, Select, Text, Tooltip } from '../../../src/primitives';
import type { AnchoredPlacement } from '../../../src/primitives';
import { DropdownMenu } from '../../../src/composites';
import { REGIONS } from './picker-data';

type AnchoredArgs = {
  placement: AnchoredPlacement;
  flip: boolean;
  open: boolean;
};

const PLACEMENTS: readonly AnchoredPlacement[] = ['bottom-start', 'bottom-center', 'bottom-end', 'top-start', 'top-center', 'top-end', 'right-start'];

const MENU = [
  { key: 'save', label: 'Save the run' },
  { key: 'share', label: 'Share the seed' },
  'separator' as const,
  { key: 'delete', label: 'Delete' },
];

const PinnedPanel = (props: Partial<AnchoredArgs>) => {
  const { placement = 'bottom-start', flip = true, open = true } = props;
  const anchorRef = useRef<HTMLButtonElement>(null);
  const [shown, setShown] = useState(open);
  return (
    <Box className="anchored-demo__stage">
      <Button ref={anchorRef} variant="secondary" onClick={() => setShown((was) => !was)}>{placement}</Button>
      {shown && (
        <Anchored anchorRef={anchorRef} placement={placement} flip={flip} className="anchored-demo__panel">
          <Text>Pinned by the browser, in the same frame as the scroll.</Text>
        </Anchored>
      )}
    </Box>
  );
};

const Placements = () => (
  <Box className="anchored-demo__grid">
    {PLACEMENTS.map((placement) => <PinnedPanel key={placement} placement={placement} />)}
  </Box>
);

const ScrollBox = () => {
  const [region, setRegion] = useState<string | null>('Eastern Palace');
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLButtonElement>(null);
  return (
    <ScrollArea className="anchored-demo__scroller">
      <Box className="anchored-demo__track">
        <Text className="anchored-demo__filler">Open the list, the menu or hover the hint, then scroll this box or the page.</Text>
        <Select items={REGIONS} value={region} onChange={setRegion} className="anchored-demo__select" />
        <ButtonRow>
          <Button ref={menuRef} variant="secondary" onClick={() => setMenuOpen((was) => !was)}>Run menu</Button>
          <Tooltip content="A hint that stays on its word">
            <Text as="span" className="anchored-demo__hint">Hover for a hint</Text>
          </Tooltip>
        </ButtonRow>
        {menuOpen && <DropdownMenu items={MENU} anchorRef={menuRef} />}
        <Text className="anchored-demo__filler">More content, so the box scrolls.</Text>
        <Box className="anchored-demo__spacer" />
      </Box>
    </ScrollArea>
  );
};

export { PinnedPanel, Placements, ScrollBox };
export type { AnchoredArgs };
