/* @layer tooling-scripts @kind test */
import eraserIcon from '@iconify-icons/lucide/eraser';
import handIcon from '@iconify-icons/lucide/hand';
import paintBucketIcon from '@iconify-icons/lucide/paint-bucket';
import pipetteIcon from '@iconify-icons/lucide/pipette';
import databaseIcon from '@iconify-icons/lucide/database';
import saveIcon from '@iconify-icons/lucide/save';
import shovelIcon from '@iconify-icons/lucide/shovel';
import skullIcon from '@iconify-icons/lucide/skull';
import treeDeciduousIcon from '@iconify-icons/lucide/tree-deciduous';
import wavesIcon from '@iconify-icons/lucide/waves';
import zoomInIcon from '@iconify-icons/lucide/zoom-in';
import zoomOutIcon from '@iconify-icons/lucide/zoom-out';
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

  it('names the Lucide zoom icons a viewer zooms with', () => {
    expect(ICONS['zoom-in']).toBe(zoomInIcon);
    expect(ICONS['zoom-out']).toBe(zoomOutIcon);
  });

  it('names the Lucide icons a drawing tool rail uses', () => {
    expect(ICONS.eraser).toBe(eraserIcon);
    expect(ICONS['paint-bucket']).toBe(paintBucketIcon);
    expect(ICONS.pipette).toBe(pipetteIcon);
    expect(ICONS.hand).toBe(handIcon);
  });

  it('names the Lucide icons a game tracker marks checks and states with, short names beside the Lucide ones', () => {
    expect(ICONS.skull).toBe(skullIcon);
    expect(ICONS.shovel).toBe(shovelIcon);
    expect(ICONS['tree-deciduous']).toBe(treeDeciduousIcon);
    expect(ICONS.tree).toBe(treeDeciduousIcon);
    expect(ICONS.waves).toBe(wavesIcon);
    expect(ICONS.water).toBe(wavesIcon);
    expect(ICONS.save).toBe(saveIcon);
  });
});
