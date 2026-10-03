/* @layer stories @kind component */
import { OptionRow } from '../../../src/composites';
import { SegmentedControl, Toggle } from '../../../src/primitives';
import type { SegmentOption } from '../../../src/primitives';
import type { PlayersView } from './data-widget-panels';

type PlayersSort = Required<PlayersView>['sort'];

type PlayersOptionRowsProps = {
  view: Required<PlayersView>;
  onChange: (patch: PlayersView) => void;
};

const SORTS: SegmentOption<PlayersSort>[] = [
  { value: 'name', label: 'Name', hint: { label: 'Sort by name', description: 'Players in alphabetical order' } },
  { value: 'progress', label: 'Progress', hint: { label: 'Sort by progress', description: 'Players closest to their goal first' } },
];

const COMPACT_HINT = { label: 'Compact rows', description: 'One line per player: the game and the progress bar go' };
const FINISHED_HINT = { label: 'Finished players', description: 'Keep players who reached their goal in the list' };

const PlayersOptionRows = (props: PlayersOptionRowsProps) => {
  const { view, onChange } = props;
  return (
    <>
      <OptionRow label="Sort">
        <SegmentedControl size="sm" aria-label="Sort" value={view.sort} options={SORTS} onChange={(sort) => onChange({ sort })} />
      </OptionRow>
      <OptionRow label="Compact rows">
        <Toggle size="sm" checked={view.compact} onChange={(compact) => onChange({ compact })} hint={COMPACT_HINT} />
      </OptionRow>
      <OptionRow label="Finished">
        <Toggle size="sm" checked={view.finished} onChange={(finished) => onChange({ finished })} hint={FINISHED_HINT} />
      </OptionRow>
    </>
  );
};

export { PlayersOptionRows };
