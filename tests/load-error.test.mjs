/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { rawError } from '../src/composites/LoadError/behavior/raw-error';

const RAW = 'connect ECONNREFUSED 127.0.0.1:7341';

describe('K1 rawError', { tags: ['critical'] }, () => {
  it('reads an Error, a string, an object and nothing', () => {
    const error = new Error('boom');
    expect(rawError(error)).toBe(error.stack);
    expect(rawError(Object.assign(new Error('bare'), { stack: undefined }))).toBe('bare');
    expect(rawError(RAW)).toBe(RAW);
    expect(rawError({ code: 7 })).toBe('{\n  "code": 7\n}');
    const loop = {};
    loop.self = loop;
    expect(rawError(loop)).toBe('[object Object]');
    expect(rawError(42)).toBe('42');
    for (const empty of [undefined, null, false, '']) expect(rawError(empty)).toBeNull();
  });
});
