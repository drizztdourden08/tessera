/* @layer tooling-scripts @kind test */
import { existsSync, readFileSync } from 'node:fs';
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { BRAND_APPS, BRAND_RIM, BRAND_RIM_TONES, BrandMark, ICON_SIZES, iconFiles, Logo } from '../src/brand';

const brandFile = (path) => new URL(`../brand/${path}`, import.meta.url);

describe('brand rims', () => {
  it('draws no rim by default and a rim of the asked tone behind the mark', () => {
    expect(renderToString(h(BrandMark, { app: 'brock' }))).not.toContain('brand-rim');
    const html = renderToString(h(BrandMark, { app: 'brock', rim: 'light', size: 'sm' }));
    expect(html).toContain('brand-rim brand-rim--light');
    expect(html).toContain('vector-effect="non-scaling-stroke"');
    expect(html.indexOf('brand-rim')).toBeLessThan(html.indexOf('#2c2d2f'));
  });

  it('rims the mark and the name of Logo.Combined', () => {
    const html = renderToString(h(Logo.Combined, { brand: 'archipelia', rim: 'dark' }));
    expect(html.match(/brand-rim--dark/g)).toHaveLength(2);
  });

  it('writes the rim colours as tokens', () => {
    const css = readFileSync(new URL('../src/tokens/brand.css', import.meta.url), 'utf8');
    for (const tone of BRAND_RIM_TONES) expect(css).toContain(`--brand-rim-${tone}: ${BRAND_RIM.colours[tone]};`);
  });

  it.each(BRAND_APPS.flatMap((app) => BRAND_RIM_TONES.map((tone) => [app, tone])))('has every %s file with a %s rim', (app, tone) => {
    expect(existsSync(brandFile(`${tone}-rim/${app}.svg`))).toBe(true);
    for (const files of iconFiles(app, tone)) {
      for (const size of ICON_SIZES.ladder) expect(existsSync(brandFile(files.ladder(size)))).toBe(true);
      if (files.ico) expect(existsSync(brandFile(files.ico))).toBe(true);
    }
  });
});
