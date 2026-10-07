/* @layer stories @kind util */
import type { ItemListGroup } from '../../../src/composites';
import { INSTALLED_GAMES } from './preset-samples.constants';

const presetGames = (onNew: (game: string) => void): ItemListGroup[] => INSTALLED_GAMES.map((game) => ({
  name: game,
  empty: 'No preset for this game yet.',
  action: { label: 'New preset', onSelect: () => onNew(game) },
}));

export { presetGames };
