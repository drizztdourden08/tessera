/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ScreenPage } from '../src/composites/ScreenPage';
import { SideNavLayoutPane } from '../src/composites/SideNavLayout/sub-components/SideNavLayoutPane';

describe('page scrollers keep their gutter', () => {
  it('ScreenPage and SideNavLayout content reserve the scrollbar gutter', () => {
    expect(renderToString(h(ScreenPage, { title: 'Lobby' }, 'Body'))).toContain('scroll-area--stable-gutter');
    expect(renderToString(h(SideNavLayoutPane, { scroll: true }, 'Body'))).toContain('scroll-area--stable-gutter');
  });
});
