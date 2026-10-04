/* @layer stories @kind component */
import { useRef, useState } from 'react';
import { MascotStage } from '../MascotStage';
import type { MascotStageHandle } from '../MascotStage';
import { Box, Button, Card, Flex, SegmentedControl, Stack, Text } from '../../../src/primitives';
import { BRAND_OF, MASCOT_OPTIONS } from './stage-mascots.constants';
import type { MascotKey } from './stage-mascots.constants';

const STOPS = [
  { title: 'Inbox', text: 'Everything that came in today.' },
  { title: 'Search', text: 'Find any record by name.' },
  { title: 'Reports', text: 'Charts of the week.' },
  { title: 'Settings', text: 'How the app behaves.' },
] as const;

const STAND_OFF = 70;

const StageTour = () => {
  const stage = useRef<MascotStageHandle>(null);
  const cards = useRef<(HTMLElement | null)[]>([]);
  const [who, setWho] = useState<MascotKey>('flint');
  const [stop, setStop] = useState(-1);
  const goTo = async (index: number) => {
    const handle = stage.current;
    const card = cards.current[index]?.getBoundingClientRect();
    const actor = handle?.actor(who);
    if (!handle || !card || !actor) return;
    setStop(index);
    const centre = handle.stageX(card.left + card.width / 2);
    const roomLeft = centre - STAND_OFF > STAND_OFF;
    const result = await actor.moveTo(roomLeft ? centre - STAND_OFF : centre + STAND_OFF, { speed: 240 });
    if (result === 'done') await actor.play('point', { face: roomLeft ? 'right' : 'left' });
  };
  return (
    <Stack gap="md">
      <Flex gap="sm" align="center" wrap>
        <SegmentedControl aria-label="Guide" size="sm" value={who} options={MASCOT_OPTIONS} onChange={(m) => { setWho(m); setStop(-1); }} />
        <Button size="sm" onClick={() => void goTo((stop + 1) % STOPS.length)} data-testid="tour-next">{stop < 0 ? 'Start the tour' : 'Next stop'}</Button>
        <Button size="sm" variant="secondary" onClick={() => void goTo(Math.floor(Math.random() * STOPS.length))}>Any stop</Button>
      </Flex>
      <Stack gap="xs" className="stage-tour">
        <Flex gap="md" className="stage-tour__cards">
          {STOPS.map((s, i) => (
            <Box key={s.title} ref={(el) => { cards.current[i] = el; }} className={['stage-tour__card', i === stop ? 'stage-tour__card--lit' : ''].join(' ')}>
              <Card>
                <Stack gap="xs">
                  <Text variant="title">{s.title}</Text>
                  <Text variant="caption">{s.text}</Text>
                </Stack>
              </Card>
            </Box>
          ))}
        </Flex>
        <MascotStage key={who} ref={stage} cast={[{ id: who, brand: BRAND_OF[who], x: 60 }]} height={150} label="The tour guide" />
      </Stack>
    </Stack>
  );
};

export { StageTour };
