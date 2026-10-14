/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import * as composites from '../src/composites';
import * as data from '../src/data';
import * as primitives from '../src/primitives';
import * as root from '../src';

const noNode = () => null;

const field = (path, kind, extra = {}) => ({ path, label: path, kind, ...extra });

describe('the helpers an app reaches for beside RecordEditor and ScrollArea', () => {
  it('exports each from its entry point and from the package root', () => {
    expect(data.blankValue).toBeTypeOf('function');
    expect(composites.IDENTITY_PATH).toBe('id');
    expect(data.IDENTITY_PATH).toBe(composites.IDENTITY_PATH);
    expect(primitives.createScrollSyncController).toBeTypeOf('function');
    expect(root.blankValue).toBe(data.blankValue);
    expect(root.IDENTITY_PATH).toBe('id');
    expect(root.createScrollSyncController).toBe(primitives.createScrollSyncController);
  });

  it('blankValue builds each required field at its empty value, and skips the optional ones', () => {
    const spawn = field('spawn', 'object', {
      children: [
        field('spawn.actorId', 'idRef'),
        field('spawn.count', 'number'),
        field('spawn.hidden', 'boolean'),
        field('spawn.facing', 'enum', { options: ['north', 'south'] }),
        field('spawn.tags', 'array'),
        field('spawn.note', 'string', { optional: true }),
        field('spawn.tile', 'object', { children: [field('spawn.tile.x', 'number'), field('spawn.tile.y', 'number')] }),
      ],
    });
    expect(data.blankValue(spawn)).toEqual({ actorId: '', count: 0, hidden: false, facing: 'north', tags: [], tile: { x: 0, y: 0 } });
    expect(data.blankValue(field('name', 'string'))).toBe('');
  });

  it('blankValue stops at a depth of four, so a schema that nests itself cannot loop', () => {
    const deep = (level) => field(`f${level}`, 'object', { children: level < 8 ? [deep(level + 1)] : [] });
    expect(data.blankValue(deep(0))).toEqual({ f1: { f2: { f3: { f4: {} } } } });
  });

  it('createScrollSyncController moves a box once and swallows the scroll event that move sends back', () => {
    const node = { scrollTop: 0, scrollLeft: 0, moves: 0, scrollTo({ top, left }) { this.moves += 1; this.scrollTop = top; this.scrollLeft = left; } };
    const seen = [];
    const sync = primitives.createScrollSyncController(() => node);
    sync.applyScrollTo({ top: 120 });
    sync.applyScrollTo({ top: 120 });
    expect(node.moves).toBe(1);
    sync.handleScroll({ top: 120, left: 0 }, (at) => seen.push(at));
    sync.handleScroll({ top: 160, left: 0 }, (at) => seen.push(at));
    expect(seen).toEqual([{ top: 160, left: 0 }]);
    expect(() => primitives.createScrollSyncController(noNode).applyScrollTo({ top: 5 })).not.toThrow();
  });
});
