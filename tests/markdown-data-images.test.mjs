/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { Markdown } from '../src/composites/Markdown';
import { dataImage } from '../src/composites/Markdown/behavior/data-image';
import { DATA_IMAGE_MAX_LENGTH } from '../src/composites/Markdown/behavior/data-image.constants';
import { imageSource } from '../src/composites/Markdown/behavior/image-source';

const PNG = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==';

const draw = (props, source) => renderToString(h(Markdown, props, source));

describe('dataImage', () => {
  it('keeps png, jpeg, gif and webp base64 images', () => {
    expect(dataImage(PNG)).toBe(PNG);
    for (const type of ['png', 'jpeg', 'gif', 'webp']) {
      const src = `data:image/${type};base64,QUJDRA==`;
      expect(dataImage(src)).toBe(src);
    }
  });

  it('refuses svg in every spelling', () => {
    expect(dataImage('data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=')).toBeUndefined();
    expect(dataImage('data:image/svg+xml,<svg onload=alert(1)>')).toBeUndefined();
    expect(dataImage('DATA:IMAGE/SVG+XML;BASE64,PHN2Zz48L3N2Zz4=')).toBeUndefined();
    expect(dataImage('data:image/svg;base64,QUJD')).toBeUndefined();
  });

  it('refuses every other data type', () => {
    for (const src of [
      'data:text/html;base64,PHNjcmlwdD4=',
      'data:text/plain;base64,QUJD',
      'data:application/javascript;base64,QUJD',
      'data:image/bmp;base64,QUJD',
      'data:image/x-icon;base64,QUJD',
      'data:image/pngx;base64,QUJD',
      'data:;base64,QUJD',
      'data:base64,QUJD',
    ]) {
      expect(dataImage(src)).toBeUndefined();
    }
  });

  it('handles an uppercase MIME type', () => {
    expect(dataImage('data:IMAGE/PNG;base64,QUJD')).toBe('data:IMAGE/PNG;base64,QUJD');
    expect(dataImage('DATA:Image/Jpeg;BASE64,QUJD')).toBe('DATA:Image/Jpeg;BASE64,QUJD');
    expect(dataImage('data:IMAGE/SVG+XML;base64,QUJD')).toBeUndefined();
  });

  it('removes whitespace from the body and the ends', () => {
    expect(dataImage('data:image/png;base64,QUJD\nRE==')).toBe('data:image/png;base64,QUJDRE==');
    expect(dataImage('  data:image/png;base64,QU JD RA==  ')).toBe('data:image/png;base64,QUJDRA==');
    expect(dataImage('data:image/png; base64,QUJD')).toBeUndefined();
  });

  it('refuses a body with characters outside base64', () => {
    for (const body of ['QUJD<script>', 'QUJD"onerror=', 'QUJD%20', 'QUJD-_', 'QU=JD', 'QUJD===', '=QUJD', '']) {
      expect(dataImage(`data:image/png;base64,${body}`)).toBeUndefined();
    }
  });

  it('refuses parameters and non-base64 encodings', () => {
    expect(dataImage('data:image/png;charset=utf-8;base64,QUJD')).toBeUndefined();
    expect(dataImage('data:image/png,QUJD')).toBeUndefined();
    expect(dataImage('data:image/png;base32,QUJD')).toBeUndefined();
  });

  it('caps the length', () => {
    const head = 'data:image/png;base64,';
    const fits = head + 'A'.repeat(DATA_IMAGE_MAX_LENGTH - head.length);
    expect(dataImage(fits)).toBe(fits);
    expect(dataImage(`${fits}A`)).toBeUndefined();
    expect(dataImage(head + 'A'.repeat(DATA_IMAGE_MAX_LENGTH * 2))).toBeUndefined();
  });

});

describe('dataImage with other schemes', () => {
  it('refuses scripts and other addresses', () => {
    for (const src of ['javascript:alert(1)', 'javascript:data:image/png;base64,QUJD', 'vbscript:x', 'https://example.com/a.png', '/files/a.png', '', 'a.png']) {
      expect(dataImage(src)).toBeUndefined();
    }
  });
});

describe('Markdown data images', () => {
  it('draws a base64 image when images is on', () => {
    const html = draw({ images: true }, `![Dot](${PNG})`);
    expect(html).toContain(`src="${PNG}"`);
    expect(html).toContain('alt="Dot"');
  });

  it('keeps the alt text when images is off', () => {
    const html = draw({}, `![Dot](${PNG})`);
    expect(html).not.toContain('<img');
    expect(html).toContain('Dot');
  });

  it('never draws an svg or html data image', () => {
    for (const src of ['data:image/svg+xml;base64,PHN2Zz48L3N2Zz4=', 'data:text/html;base64,PGgxPg==', 'javascript:alert(1)']) {
      const html = draw({ images: true }, `![Bad](${src})`);
      expect(html).not.toContain('<img');
      expect(html).toContain('Bad');
    }
  });

  it('applies the same filter to what a resolver returns', () => {
    expect(imageSource('x', () => PNG)).toBe(PNG);
    expect(imageSource('x', () => 'data:image/svg+xml;base64,QUJD')).toBeUndefined();
  });
});
