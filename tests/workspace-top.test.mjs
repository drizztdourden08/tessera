/* @layer tooling-scripts @kind test */
import { describe, expect, it } from 'vitest';
import { currentItem } from '../src/composites/SideNavLayout/behavior/current-item';
import { navConfigOf } from '../src/composites/WorkspaceScreen/behavior/nav-config-of';
import { pagesOf } from '../src/composites/WorkspaceScreen/behavior/pages-of';

const page = (id) => ({ id, title: id.toUpperCase(), icon: null });
const content = { home: page('home'), top: [page('inbox')], groups: [{ id: 'g', label: 'G', pages: [page('audio')] }] };

describe('WorkspaceScreen top pages', () => {
  it('passes the top pages to the nav config beside home', () => {
    const config = navConfigOf(content);
    expect(config.home?.id).toBe('home');
    expect(config.top?.map((item) => item.id)).toEqual(['inbox']);
  });

  it('leaves top out of the nav config when none is given', () => {
    expect(navConfigOf({ groups: content.groups }).top).toBeUndefined();
  });

  it('lists home, then the top pages, then the group pages', () => {
    expect(pagesOf(content).map((p) => p.id)).toEqual(['home', 'inbox', 'audio']);
  });

  it('finds a top page as the current item', () => {
    expect(currentItem(navConfigOf(content), 'inbox')?.label).toBe('INBOX');
  });
});
