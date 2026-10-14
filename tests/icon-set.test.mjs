/* @layer tooling-scripts @kind test */
import databaseIcon from '@iconify-icons/lucide/database';
import { describe, expect, it } from 'vitest';
import { ICONS } from '../src/primitives/Icon/Icon.constants';

const ADDED = [
  'shuffle', 'database', 'store', 'camera', 'joystick', 'smartphone', 'wrench', 'dices',
  'list-checks', 'scroll-text', 'network', 'person-standing', 'languages', 'music', 'layout-dashboard',
];

describe('the named icon set', () => {
  it('names the Lucide icons an app shell needs for its sections, each drawn from its own data', () => {
    for (const name of ADDED) expect(ICONS[name]?.body, name).toMatch(/^<(path|g|circle|rect)/);
    expect(ICONS.database).toBe(databaseIcon);
    expect(new Set(ADDED.map((name) => ICONS[name])).size).toBe(ADDED.length);
  });
});
