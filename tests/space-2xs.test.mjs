/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Center } from '../src/primitives/Center';
import { Flex } from '../src/primitives/Flex';
import { Grid } from '../src/primitives/Grid';
import { Inline } from '../src/primitives/Inline';
import { Spacer } from '../src/primitives/Spacer';
import { Stack } from '../src/primitives/Stack';

const css = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');

describe('the 2xs space step', () => {
  it('is the 2 px token', () => {
    expect(css('src/tokens/space.css')).toMatch(/--space-2xs: +var\(--size-2\);/);
  });

  it('sets a 2xs gap on Flex and Grid and a 2xs Spacer', () => {
    expect(css('src/primitives/Flex/Flex.css')).toContain(".flex[data-gap='2xs'] { gap: var(--space-2xs); }");
    expect(css('src/primitives/Grid/Grid.css')).toContain(".grid[data-gap='2xs'] { gap: var(--space-2xs); }");
    expect(css('src/primitives/Spacer/Spacer.css')).toMatch(/\.spacer\[data-size='2xs'\] \{\s*width: var\(--space-2xs\);\s*height: var\(--space-2xs\);/);
  });

  it('reaches Flex, Stack, Inline, Center, Grid and Spacer', () => {
    for (const part of [Flex, Stack, Inline, Center, Grid]) {
      expect(renderToString(h(part, { gap: '2xs' }))).toContain('data-gap="2xs"');
    }
    expect(renderToString(h(Spacer, { size: '2xs' }))).toContain('data-size="2xs"');
  });
});
