/* @layer tooling-scripts @kind test */
import { readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import botIcon from '@iconify-icons/lucide/bot';
import branchIcon from '@iconify-icons/lucide/git-branch';
import flaskConicalIcon from '@iconify-icons/lucide/flask-conical';
import { describe, expect, it } from 'vitest';
import { classesOf } from '../src/composites/DataTable/behavior/classes-of';
import { ContentHeader } from '../src/composites/ContentHeader';
import { Badge } from '../src/primitives/Badge';
import { ICONS } from '../src/primitives/Icon/Icon.constants';
import { PageFrame } from '../src/primitives/PageFrame';
import { SectionHeader } from '../src/primitives/SectionHeader';
import { Status } from '../src/primitives/Status';
import { Tag } from '../src/primitives/Tag';

const read = (path) => readFileSync(new URL(`../${path}`, import.meta.url), 'utf8');
const rule = (css, selector) => css.match(new RegExp(`${selector.replace(/[[\].*']/g, '\\$&')} \\{([^}]*)\\}`))?.[1] ?? '';

describe('Tag pill and icon', () => {
  it('rounds fully with pill and not otherwise', () => {
    expect(renderToString(h(Tag, { pill: true }, 'Lab'))).toContain('tag tag--normal tag--neutral tag--pill');
    expect(renderToString(h(Tag, {}, 'Lab'))).not.toContain('tag--pill');
    expect(rule(read('src/primitives/Tag/Tag.css'), '.tag--pill')).toContain('border-radius: var(--radius-pill)');
  });

  it('leads the text with the icon, hidden from readers', () => {
    const out = renderToString(h(Tag, { icon: 'flask' }, 'Lab'));
    expect(out.indexOf('<svg')).toBeGreaterThan(-1);
    expect(out.indexOf('<svg')).toBeLessThan(out.indexOf('Lab'));
    expect(out).toContain('aria-hidden="true"');
    expect(renderToString(h(Tag, {}, 'Lab'))).not.toContain('<svg');
  });
});

describe('Badge icon', () => {
  it('leads a count with the icon', () => {
    const out = renderToString(h(Badge, { variant: 'inline', value: 3, icon: 'flask' }));
    expect(out).toContain('badge--iconed');
    expect(out.indexOf('<svg')).toBeLessThan(out.indexOf('>3<'));
  });

  it('draws no icon without one, and none when the badge shows nothing', () => {
    expect(renderToString(h(Badge, { variant: 'inline', value: 3 }))).not.toContain('<svg');
    expect(renderToString(h(Badge, { variant: 'inline', value: 0, hideZero: true, icon: 'flask' }))).toBe('');
  });
});

describe('Status size', () => {
  it('adds the sm class and keeps the normal size classless', () => {
    expect(renderToString(h(Status, { size: 'sm', tone: 'success' }, 'Live'))).toContain('status--sm');
    expect(renderToString(h(Status, { tone: 'success' }, 'Live'))).not.toContain('status--sm');
    expect(renderToString(h(Status, { size: 'sm', variant: 'pill', tone: 'info' }, 'Live'))).toContain('status--pill status--info status--sm');
  });

  it('is about 18px tall, from a token', () => {
    expect(read('src/tokens/size.css')).toMatch(/--status-h-sm: calc\(18 \* var\(--size-1\)\)/);
    expect(rule(read('src/primitives/Status/Status.css'), '.status--sm')).toContain('height: var(--status-h-sm)');
  });
});

describe('DataTable fresh rows and header case', () => {
  const css = read('src/composites/DataTable/DataTable.css');

  it('tints a fresh row from the info soft token', () => {
    expect(rule(css, ".data-table__row[data-state='fresh']")).toContain('background: var(--c-info-soft)');
    expect(read('src/composites/DataTable/DataTable.type.ts')).toMatch(/type RowState = [^;]*'fresh'/);
  });

  it('lets selection win over the fresh tint by coming after it', () => {
    expect(css.indexOf("[data-state='fresh']")).toBeLessThan(css.indexOf('.data-table__row.data-table__row--selected'));
    expect(css.indexOf("[data-state='fresh']")).toBeGreaterThan(css.indexOf('.data-table__row:hover'));
  });

  it('sets the upper header class only with headerCase upper', () => {
    expect(classesOf(false, false, 'upper')).toContain('data-table--upper-headers');
    expect(classesOf(false, false, 'normal')).not.toContain('upper-headers');
    expect(classesOf(true, false)).toBe('data-table data-table--selectable');
  });

  it('spaces and capitalises the header labels from tokens', () => {
    const body = rule(read('src/composites/DataTable/sub-components/HeaderCell.css'), '.data-table--upper-headers .data-table__header-label');
    expect(body).toContain('text-transform: uppercase');
    expect(body).toContain('letter-spacing: var(--tracking-caps)');
  });
});

describe('the flask and robot icons', () => {
  it('use the Lucide flask-conical and bot data', () => {
    expect(ICONS.flask).toBe(flaskConicalIcon);
    expect(ICONS.robot).toBe(botIcon);
  });
});

describe('ContentHeader plain variant', () => {
  const html = (props) => renderToString(h(ContentHeader, { title: 'Overview', ...props }));

  it('drops the backdrop and marks the plain class', () => {
    expect(html({ variant: 'plain' })).toContain('content-header--plain');
    expect(html({ variant: 'plain' })).not.toContain('content-header__backdrop');
    expect(html({})).toContain('content-header__backdrop');
    expect(html({})).not.toContain('content-header--plain');
  });

  it('has no gradient and no bottom border', () => {
    const css = read('src/composites/ContentHeader/ContentHeader.css');
    expect(rule(css, '.content-header--plain')).toContain('border-bottom: none');
    expect(rule(css, '.content-header--plain::before')).toContain('content: none');
  });
});

describe('Tag as a link', () => {
  const html = (props) => renderToString(h(Tag, { href: '/games/zelda', ...props }, 'Zelda'));

  it('renders an anchor through Link with the chip look and a 24px target', () => {
    const out = html({ color: 'primary' });
    expect(out).toMatch(/^<a [^>]*href="\/games\/zelda"/);
    expect(out).toContain('link tag tag--normal tag--primary tag--link hit-area');
    expect(out).toContain('tag__text">Zelda</span></a>');
  });

  it('keeps pill and icon, and hands target to the anchor', () => {
    const out = html({ pill: true, icon: 'flask', target: '_blank', rel: 'noreferrer' });
    expect(out).toContain('tag--pill');
    expect(out).toContain('<svg');
    expect(out).toContain('target="_blank"');
  });

  it('drops the href when disabled and says so', () => {
    const out = html({ disabled: true });
    expect(out).not.toContain('href=');
    expect(out).toContain('aria-disabled="true"');
  });

  it('is still a span without an href', () => {
    expect(renderToString(h(Tag, {}, 'Zelda'))).toMatch(/^<span /);
  });

  it('shows no underline and keeps a focus ring', () => {
    const css = read('src/primitives/Tag/Tag.css');
    expect(css).toMatch(/\.tag--link:hover \{[^}]*text-decoration: none/);
    expect(rule(css, '.tag--link:focus-visible')).toContain('var(--c-focus)');
  });
});

describe('the branch icon', () => {
  it('uses the Lucide git-branch data under the name git-branch', () => {
    expect(ICONS['git-branch']).toBe(branchIcon);
  });
});

describe('SectionHeader large title and wrapping', () => {
  const html = (props) => renderToString(h(SectionHeader, { title: 'Overview', ...props }));

  it('marks the lg and wrap classes only when asked', () => {
    expect(html({ size: 'lg', wrap: true })).toContain('section-header section-header--lg section-header--wrap');
    expect(html({})).toContain('class="section-header"');
  });

  it('keeps the count inline in the title', () => {
    const out = html({ size: 'lg', wrap: true, count: 12 });
    expect(out.indexOf('Overview')).toBeLessThan(out.indexOf('section-header__count'));
    expect(out.indexOf('section-header__count')).toBeLessThan(out.indexOf('</h3>'));
  });

  it('sets the large title from tokens and lets a wrapping title flow as text', () => {
    const css = read('src/primitives/SectionHeader/SectionHeader.css');
    expect(rule(css, '.section-header--lg .section-header__title')).toContain('font-size: var(--text-xl)');
    expect(rule(css, '.section-header--wrap .section-header__title')).toContain('display: block');
  });
});

describe('PageFrame padding', () => {
  const html = (props) => renderToString(h(PageFrame, props, 'Hello'));

  it('marks md padding and leaves the default unmarked', () => {
    expect(html({ padding: 'md' })).toContain('data-padding="md"');
    expect(html({})).not.toContain('data-padding');
    expect(html({ padding: 'lg' })).not.toContain('data-padding');
  });

  it('pads 16px from the space token and keeps the default at xl', () => {
    const css = read('src/primitives/PageFrame/PageFrame.css');
    expect(rule(css, ".page-frame[data-padding='md']")).toContain('padding: var(--space-lg)');
    expect(css).toMatch(/\.page-frame \{\s*block-size: 100dvh;\s*padding: var\(--space-xl\);/);
  });
});
