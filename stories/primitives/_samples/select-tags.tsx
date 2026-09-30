/* @layer stories @kind component */
import { useState } from 'react';
import { Select } from '../../../src/primitives';
import { ValueReadout } from '../../_template/ValueReadout';
import { GAMES, PLAYERS } from './picker-data';
import type { Game, Player } from './picker-data';

type GameTagsProps = { className?: string; initial: number };

const TagsFit = () => {
  const [players, setPlayers] = useState<Player[]>(PLAYERS.slice(0, 2));
  return (
    <ValueReadout value={players.map((player) => player.name)}>
      <Select items={PLAYERS} min={0} max={Infinity} multiDisplay="tags" values={players} onValuesChange={setPlayers} placeholder="Pick players" />
    </ValueReadout>
  );
};

const GameTags = (props: GameTagsProps) => {
  const { className, initial } = props;
  const [games, setGames] = useState<Game[]>(GAMES.slice(0, initial));
  return (
    <ValueReadout value={games.map((game) => game.id)}>
      <Select
        className={className}
        items={GAMES}
        min={0}
        max={Infinity}
        multiDisplay="tags"
        tagField="title"
        values={games}
        onValuesChange={setGames}
        placeholder="Pick games"
      />
    </ValueReadout>
  );
};

const TagsOverflow = () => <GameTags className="picker-narrow" initial={5} />;

const TagsCount = () => <GameTags className="picker-tiny" initial={4} />;

export { TagsCount, TagsFit, TagsOverflow };
