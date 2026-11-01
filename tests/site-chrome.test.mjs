/* @layer tooling-scripts @kind test */
import { describe, expect, it, vi } from 'vitest';
import { goTo } from '../src/composites/SiteHeader/behavior/go-to';

const LINKS = [
  { id: 'home', label: 'Home', href: '/' },
  { id: 'browse', label: 'Browse', href: '/browse' },
  { id: 'discord', label: 'Discord', href: 'https://discord.com', external: true },
];

describe('K1 goTo', { tags: ['critical'] }, () => {
  it('hands a local link to navigate, opens an external one in a new tab, and assigns the location without a router', () => {
    const navigate = vi.fn();
    goTo(LINKS[1], navigate);
    expect(navigate).toHaveBeenCalledWith('/browse');
    const open = vi.fn();
    const assign = vi.fn();
    vi.stubGlobal('window', { open, location: { assign } });
    goTo(LINKS[2], navigate);
    expect(open).toHaveBeenCalledWith('https://discord.com', '_blank', 'noopener');
    goTo(LINKS[0]);
    expect(assign).toHaveBeenCalledWith('/');
    expect(navigate).toHaveBeenCalledTimes(1);
    vi.unstubAllGlobals();
  });
});
