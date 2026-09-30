/* @layer stories @kind component */
import { useState } from 'react';
import { Combobox } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { BuildDetails } from './BuildDetails';
import { BUILDS, GAMES, PLAYERS, REGIONS } from './picker-data';
import { GAME_CATEGORIES, GAME_COLUMNS } from './picker-emoji';
import { useGameSearch } from './picker-live';
import type { PickerArgs } from './picker-story';
import type { Build, Game, Player } from './picker-data';

type ComboboxArgs = PickerArgs & {
  placeholder: string;
  grouped: boolean;
  highlight: boolean;
};

const startsWith = (game: Game, query: string): boolean => game.title.toLowerCase().startsWith(query.trim().toLowerCase());

const titleOf = (game: Game | null): string => game?.title ?? 'none';

const GamePicker = (props: Partial<ComboboxArgs> & { prefix?: boolean }) => {
  const { grouped, prefix, max = 1, ...rest } = props;
  const [game, setGame] = useState<Game | null>(null);
  const [games, setGames] = useState<Game[]>([]);
  return (
    <ValueReadout value={max > 1 ? games.map((entry) => entry.title) : titleOf(game)}>
      <Combobox
        className="combobox-narrow"
        {...rest}
        items={GAMES}
        columns={GAME_COLUMNS}
        groupBy={grouped ? 'kind' : undefined}
        categories={GAME_CATEGORIES}
        filter={prefix ? startsWith : undefined}
        max={max}
        value={game}
        onChange={setGame}
        values={games}
        onValuesChange={setGames}
      />
    </ValueReadout>
  );
};

const ComboboxPlayground = (props: Partial<ComboboxArgs>) => <GamePicker {...props} />;

const Filtering = () => {
  const [region, setRegion] = useState<string | null>(null);
  return (
    <ValueReadout value={region ?? 'none'}>
      <Combobox items={REGIONS} min={0} value={region} onChange={setRegion} placeholder="Type a region" />
    </ValueReadout>
  );
};

const ColumnsHighlight = () => <GamePicker placeholder="Type a title or a platform" />;

const CategoryList = () => <GamePicker grouped placeholder="Type a game" />;

const PrefixFilter = () => <GamePicker prefix placeholder="Type the start of a title" />;

const MultiChips = () => {
  const [players, setPlayers] = useState<Player[]>(PLAYERS.slice(0, 2));
  return (
    <ValueReadout value={players.map((player) => player.name)}>
      <Combobox items={PLAYERS} min={0} max={4} values={players} onValuesChange={setPlayers} placeholder="Add players" />
    </ValueReadout>
  );
};

const ServerSearch = () => {
  const { games, loading, search } = useGameSearch();
  const [gameId, setGameId] = useState<string | null>(null);
  return (
    <ValueReadout value={gameId ?? 'none'}>
      <Combobox items={games} valueField="id" columns={GAME_COLUMNS} loading={loading} onQueryChange={search} value={gameId} onChange={setGameId} placeholder="Search the catalogue" />
    </ValueReadout>
  );
};

const FullItem = () => {
  const [build, setBuild] = useState<Build | null>(BUILDS[2] ?? null);
  return (
    <ValueReadout value={build?.name ?? 'none'}>
      <Combobox items={BUILDS} itemComponent={BuildDetails} valueDisplay="full" value={build} onChange={setBuild} placeholder="Type a build" />
    </ValueReadout>
  );
};

export { CategoryList, ColumnsHighlight, ComboboxPlayground, Filtering, FullItem, MultiChips, PrefixFilter, ServerSearch };
export type { ComboboxArgs };
