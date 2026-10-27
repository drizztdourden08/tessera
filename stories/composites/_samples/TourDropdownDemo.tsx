/* @layer stories @kind component */
import { useMemo, useRef, useState } from 'react';
import { DropdownMenu, GuidedTour, useGuidedTour } from '../../../src/composites';
import type { MenuGroup, TourStep } from '../../../src/composites';
import { Box, Button, Card, Text } from '../../../src/primitives';
import type { TourSampleProps } from './TourDemo.type';

const TourDropdownDemo = (props: TourSampleProps) => {
  const trigger = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(false);
  const groups = useMemo<readonly MenuGroup[]>(() => [
    {
      id: 'file',
      items: [
        { id: 'rename', label: 'Rename', onSelect: () => setDone(false) },
        { id: 'export', label: 'Export', data: { 'data-tour': 'menu-export' }, onSelect: () => setDone(true) },
        { id: 'share', label: 'Share' },
      ],
    },
  ], []);
  const steps = useMemo<TourStep[]>(() => [
    {
      id: 'button',
      target: trigger,
      placement: 'bottom-start',
      title: 'The actions',
      body: 'The next step opens this menu and lights one entry of it.',
      onEnter: () => { setDone(false); setOpen(false); },
    },
    {
      id: 'entry',
      target: { tour: 'menu-export' },
      placement: 'right-center',
      advance: 'click',
      title: 'Export',
      body: 'The veil, the ring and this bubble sit above the open menu.',
      hint: 'Click Export to go on.',
      onEnter: () => setOpen(true),
    },
    { id: 'done', title: 'Exported', body: 'The entry ran and the menu closed.', mascot: 'happy', onEnter: () => setOpen(false) },
  ], []);
  const tour = useGuidedTour({ steps });

  return (
    <Box className="tour-mini">
      <Box className="tour-mini__bar">
        <Button ref={trigger} variant="secondary" size="sm" onClick={() => setOpen(!open)}>Actions</Button>
        <Button variant="secondary" size="sm" onClick={() => tour.start()}>Start tour</Button>
      </Box>
      {open && <DropdownMenu anchorRef={trigger} groups={groups} side="below" onClose={() => setOpen(false)} />}
      <Card title="Report">
        <Text>{done ? 'Exported.' : 'Open Actions, then pick an entry.'}</Text>
      </Card>
      <GuidedTour tour={tour} mascot={props.mascot} />
    </Box>
  );
};

export { TourDropdownDemo };
