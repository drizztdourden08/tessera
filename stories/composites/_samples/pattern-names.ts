/* @layer stories @kind data */
import type { PatternChoice, PatternLists } from '../../../src/composites';

const MOODS = ['Brave', 'Quiet', 'Lucky', 'Swift', 'Clever', 'Gentle', 'Bold', 'Sleepy', 'Merry', 'Stormy', 'Silver', 'Crimson', 'Hidden', 'Wild', 'Frosty', 'Golden', 'Rusty', 'Mossy', 'Shadow', 'Sunny'];
const BEASTS = ['Otter', 'Falcon', 'Badger', 'Lynx', 'Heron', 'Fox', 'Raven', 'Moth', 'Wolf', 'Toad', 'Crane', 'Mole', 'Hare', 'Newt', 'Owl', 'Stag', 'Wren', 'Seal', 'Boar', 'Viper', 'Lark', 'Pike', 'Bison', 'Gecko', 'Ferret'];
const ROLLS = [7, 12, 23, 42, 64, 88];

const MATERIALS = ['Iron', 'Copper', 'Crystal', 'Bone', 'Oak', 'Silk', 'Obsidian', 'Amber', 'Jade', 'Coral', 'Ivory', 'Granite', 'Ember', 'Frost', 'Storm', 'Moon', 'Sun', 'Star', 'Thorn', 'Ash'];
const OBJECTS = ['Key', 'Lantern', 'Compass', 'Boots', 'Shield', 'Bow', 'Hammer', 'Map', 'Ring', 'Amulet', 'Cloak', 'Flute', 'Gauntlet', 'Helmet', 'Hookshot', 'Mirror', 'Rod', 'Sword', 'Tome', 'Wand', 'Whistle', 'Bomb Bag', 'Quiver', 'Shovel', 'Lens'];
const GRADES = ['', 'Fine ', 'Ancient ', 'Cursed ', 'Royal '];
const KINDS = ['Progression', 'Useful', 'Filler', 'Trap'];

const players: PatternChoice[] = ROLLS.flatMap((roll) =>
  MOODS.flatMap((mood) => BEASTS.map((beast) => ({ value: `${mood}${beast}${roll}` }))));

const items: PatternChoice[] = GRADES.flatMap((grade, gradeIndex) =>
  MATERIALS.flatMap((material, materialIndex) => OBJECTS.map((object, objectIndex) => ({
    value: `${grade}${material} ${object}`,
    detail: KINDS[(gradeIndex + materialIndex + objectIndex) % KINDS.length],
  }))));

const SEARCH_LISTS: PatternLists = { players, items };

export { SEARCH_LISTS };
