/* @layer stories @kind component */
import { useState } from 'react';
import { FloatingSwitch, ScreenWindow } from '../../../../src/composites';
import type { Rect } from '../../../../src/composites';
import { Box, Text } from '../../../../src/primitives';
import { ScreenDemo } from '../ScreenDemo';
import { HubContent } from './HubContent';
import { HUBS } from './hub-window.constants';
import type { HubWindowProps } from './hub-window.type';
import './hub-window.css';

const rectText = (rect: Rect | null): string =>
  (rect ? `At ${Math.round(rect.x)}, ${Math.round(rect.y)}, ${Math.round(rect.width)} by ${Math.round(rect.height)} px` : 'At its snapped spot');

const HubWindow = ({ defaultLocked = true, defaultRect }: HubWindowProps) => {
  const [hidden, setHidden] = useState(false);
  const [hub, setHub] = useState('data');
  const [locked, setLocked] = useState(defaultLocked);
  const [rect, setRect] = useState<Rect | null>(defaultRect ?? null);
  const title = HUBS.find((item) => item.id === hub)?.label ?? '';
  const switcher = <FloatingSwitch items={HUBS} activeId={hub} onSelect={setHub} label="Switch hub" />;
  const where = locked ? 'Locked: centred' : rectText(rect);
  return (
    <Box data-palette="rotp" className="hub-window">
      <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The X or Escape hides the window" tools={<Text className="story-label">{where}</Text>}>
        <ScreenWindow
          title={title}
          titleRow={false}
          movable
          defaultLocked={defaultLocked}
          defaultRect={defaultRect}
          onLockChange={setLocked}
          onRectChange={setRect}
          floating={switcher}
          hidden={hidden}
          onClose={() => setHidden(true)}
        >
          <HubContent />
        </ScreenWindow>
      </ScreenDemo>
    </Box>
  );
};

export { HubWindow };
