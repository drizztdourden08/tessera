/* @layer stories @kind story */
import { useEffect, useState } from 'react';
import { DropdownMenu } from '../../../src/composites';
import { axis } from '../../_template/axis';
import { Demonstrator } from '../../_template/Demonstrator';
import { MARK_KINDS, MARK_SHOWS, MARK_TICK_MS, markMenu, sortAt } from './menu-marks';
import type { MarkKind, MarkShow } from './menu-marks';

const useTick = (): number => {
  const [tick, setTick] = useState(0);
  useEffect(() => {
    const timer = window.setInterval(() => setTick((now) => now + 1), MARK_TICK_MS);
    return () => window.clearInterval(timer);
  }, []);
  return tick;
};

const ChangingCell = ({ kind }: { kind: MarkKind }) => {
  const tick = useTick();
  const sort = sortAt(tick);
  const groups = kind === 'Check'
    ? markMenu({ kind, count: 1, isOn: () => tick % 2 === 1 })
    : markMenu({ kind, count: 3, isOn: (id) => id === sort });
  return <DropdownMenu inline groups={groups} />;
};

const ClickCell = ({ kind }: { kind: MarkKind }) => {
  const [flags, setFlags] = useState<Record<string, boolean>>({ grid: true });
  const [sort, setSort] = useState('progress');
  const groups = kind === 'Check'
    ? markMenu({ kind, count: 2, isOn: (id) => flags[id] === true, onPick: (id) => setFlags((all) => ({ ...all, [id]: all[id] !== true })) })
    : markMenu({ kind, count: 3, isOn: (id) => id === sort, onPick: setSort });
  return <DropdownMenu inline groups={groups} />;
};

const MarkCell = ({ kind, show }: { kind: MarkKind; show: MarkShow }) => {
  if (show === 'Changing by itself') return <ChangingCell kind={kind} />;
  if (show === 'Click to change') return <ClickCell kind={kind} />;
  return <DropdownMenu inline groups={markMenu({ kind, count: 1, isOn: () => show === 'On' })} />;
};

const MarkMorphDemo = () => (
  <Demonstrator
    rows={axis(MARK_KINDS)}
    columns={axis(MARK_SHOWS)}
    valign="start"
    cell={(kind, show) => <MarkCell kind={kind} show={show} />}
  />
);

export { MarkMorphDemo };
