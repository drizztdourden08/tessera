/* @layer stories @kind logic */
import { Icon } from '../../../../src/primitives';
import type { WindowArgs, WindowTop } from './window-demo.type';

const listIcon = (players: boolean) => <Icon name={players ? 'users' : 'layers'} />;

const windowTop = (top: WindowTop) => {
  const { withHeader, players, subtitle, extra, goBack } = top;
  const back = goBack && { label: 'Home', onSelect: goBack };
  if (!withHeader) return { subtitle: subtitle || undefined, extra, back };
  return { back, header: { icon: listIcon(players), actions: extra } };
};

const cornerProps = (args: WindowArgs, players: boolean) => {
  if (args.titleRow || args.withHeader) return { movable: false };
  return { icon: args.withIcon ? listIcon(players) : undefined, cornerTitle: args.cornerTitle, movable: args.movable };
};

export { cornerProps, windowTop };
