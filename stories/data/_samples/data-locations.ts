/* @layer stories @kind data */
import type { SchemaConfig } from '../../../src/data';

type LocationRow = {
  id: string;
  name: string;
  game: string;
  region: string;
  checkedBy: string;
  item: string;
  progression: boolean;
  sphere: number;
  reward?: { item: string } | { currency: string; amount: number };
};

type Seed = [name: string, game: string, region: string, slot: number, item: string, progression: boolean, sphere: number];

const SEEDS: readonly Seed[] = [
  ['Crystal Peak Chest', 'Hollow Knight', 'Crystal Peak', 1, 'Seaglide Fragment', false, 3],
  ['Mantis Lords', 'Hollow Knight', 'Fungal Wastes', 11, 'Monarch Wings', true, 2],
  ['Resting Grounds Grub', 'Hollow Knight', 'Resting Grounds', 1, 'Oil Processing', true, 4],
  ['Farewell Golden', 'Celeste', 'Farewell', 2, 'Monarch Wings', true, 5],
  ['Summit B-Side', 'Celeste', 'Summit', 13, 'Iridium Pickaxe', false, 4],
  ['Forsaken City Cassette', 'Celeste', 'Forsaken City', 2, 'Grappling Hook', true, 1],
  ['Pierre\'s General Store', 'Stardew Valley', 'Pelican Town', 3, 'Mantis Claw', true, 1],
  ['Community Center Pantry', 'Stardew Valley', 'Pelican Town', 3, 'Speed Booster', true, 3],
  ['Automation Research', 'Factorio', 'Research', 14, 'Strawberry', false, 2],
  ['Rocket Silo', 'Factorio', 'Research', 4, 'Bash', true, 6],
  ['Dungeon Chest 4', 'Terraria', 'Underground', 5, 'Bash', true, 2],
  ['Wrecked Ship Energy Tank', 'Super Metroid', 'Wrecked Ship', 7, 'Grappling Hook', true, 3],
  ['Ginso Tree Core', 'Ori and the Blind Forest', 'Ginso Tree', 8, 'Speed Booster', true, 4],
  ['Aurora Databox', 'Subnautica', 'Crash Zone', 9, 'Timespinner Wheel', false, 2],
  ['Nether Fortress', 'Minecraft', 'Nether', 10, 'Blaze Rod', true, 3],
  ['Lake Serene Bridge', 'Timespinner', 'Lake Serene', 6, 'Twin Pyramid Key', true, 1],
];

const LOCATIONS: readonly LocationRow[] = SEEDS.map(([name, game, region, slot, item, progression, sphere], i) => ({
  id: `loc-${i + 1}`,
  name,
  game,
  region,
  checkedBy: `slot-${slot}`,
  item,
  progression,
  sphere,
  ...(i % 5 === 0 ? { reward: { item: 'Bonus Geo' } } : {}),
  ...(i % 7 === 3 ? { reward: { currency: 'Hint points', amount: 5 } } : {}),
}));

const LOCATION_CONFIG: SchemaConfig = {
  kinds: { name: 'string', item: 'string', region: 'string' },
  labels: { id: 'Location', checkedBy: 'Checked by' },
  order: ['id', 'name', 'game', 'item', 'checkedBy'],
  hidden: ['reward'],
};

export { LOCATIONS, LOCATION_CONFIG };
export type { LocationRow };
