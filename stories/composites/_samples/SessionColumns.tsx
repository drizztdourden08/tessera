/* @layer stories @kind component */
import type { ListItemColumn } from '../../../src/composites';
import { Icon } from '../../../src/primitives';
import { NAV_ICONS } from './nav';
import { STATUS_LABEL } from './sessions';
import type { SampleSession } from './sessions';

const sessionIcon = <Icon name={NAV_ICONS.sessions} />;

const sessionColumns = (session: SampleSession, count: number, twoLines: boolean): ListItemColumn[] => [
  { primary: `${session.players} players`, secondary: twoLines ? session.preset : undefined, align: 'end' as const },
  { primary: session.server, secondary: twoLines ? `host ${session.host}` : undefined },
  { primary: session.started, secondary: twoLines ? STATUS_LABEL[session.status] : undefined, align: 'end' as const },
].slice(0, count);

export { sessionColumns, sessionIcon };
