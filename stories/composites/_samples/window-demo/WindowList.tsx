/* @layer stories @kind component */
import { ListItemRow } from '../../../../src/composites';
import { ScrollArea } from '../../../../src/primitives';
import { PLAYERS, SESSIONS, STATUS_LABEL } from '../sessions';
import type { WindowListProps } from './window-demo.type';

const WindowList = ({ players, padded }: WindowListProps) => (
  <ScrollArea className={`screen-window-story__list${padded ? ' screen-window-story__list--padded' : ''}`}>
    {players
      ? PLAYERS.map((p) => <ListItemRow key={p.slot} name={p.name} meta={`${p.game}, ${p.checks} checks`} />)
      : SESSIONS.map((s) => <ListItemRow key={s.id} name={s.name} meta={`${STATUS_LABEL[s.status]}, ${s.players} players`} />)}
  </ScrollArea>
);

export { WindowList };
