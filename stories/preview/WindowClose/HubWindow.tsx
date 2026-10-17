/* @layer stories @kind component */
import { useState } from 'react';
import type { ReactNode } from 'react';
import { FloatingSwitch, ScreenWindow } from '../../../src/composites';
import { Box, Divider } from '../../../src/primitives';
import { ScreenDemo } from '../../composites/_samples/ScreenDemo';
import { CloseButton } from './CloseButton';
import { HubContent } from './HubContent';
import { TitlelessWindow } from './TitlelessWindow';
import { HUBS } from './window-close.constants';
import type { ClosePlace, CloseLook, HubWindowProps } from './window-close.type';
import './window-close.css';

const floatingFor = (place: ClosePlace, switcher: ReactNode, close: (look: CloseLook) => ReactNode): ReactNode => {
  if (place === 'row') return <Box className="window-close__row">{switcher}{close('float')}</Box>;
  if (place === 'corner') return <Box className="window-close__row">{switcher}{close('corner')}</Box>;
  if (place === 'pill') return <Box className="floating-switch window-close__pill">{switcher}<Divider orientation="vertical" className="window-close__divider" />{close('joined')}</Box>;
  return switcher;
};

const HubWindow = ({ place }: HubWindowProps) => {
  const [hidden, setHidden] = useState(false);
  const [hub, setHub] = useState('data');
  const onClose = () => setHidden(true);
  const title = HUBS.find((item) => item.id === hub)?.label ?? '';
  const switcher = <FloatingSwitch items={HUBS} activeId={hub} onSelect={setHub} label="Switch hub" />;
  const close = (look: CloseLook) => <CloseButton look={look} onClose={onClose} />;
  const window = place === 'today'
    ? <ScreenWindow title={title} floating={switcher} hidden={hidden} onClose={onClose}><HubContent /></ScreenWindow>
    : (
      <TitlelessWindow title={title} floating={floatingFor(place, switcher, close)} hidden={hidden} onClose={onClose}>
        <HubContent close={place === 'header' ? close('header') : undefined} />
      </TitlelessWindow>
    );
  return (
    <Box data-palette="rotp" className={`window-close window-close--${place}`}>
      <ScreenDemo hidden={hidden} onReopen={() => setHidden(false)} note="The X or Escape hides the window">{window}</ScreenDemo>
    </Box>
  );
};

export { HubWindow };
