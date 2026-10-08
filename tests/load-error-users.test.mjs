/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToString } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { ItemList } from '../src/composites/ItemList';
import { ReferencedBy } from '../src/composites/RecordEditor';
import { SettingsRow } from '../src/composites/SettingsRow';
import { SplashStage } from '../src/composites/Splash/sub-components/SplashStage';
import { UtilityFooter } from '../src/composites/UtilityScreen/sub-components/UtilityFooter';
import { INITIAL_MEDIA } from '../src/composites/Video/Video.constants';
import { VideoOverlay } from '../src/composites/Video/sub-components/VideoOverlay';

const noop = () => undefined;
const RAW = 'Could not read servers.json: unexpected end of input';
const list = (props) => renderToString(h(ItemList, { title: 'Servers', items: [], getId: String, getName: String, ...props }));
const row = (problem) => renderToString(h(SettingsRow, { id: 'out', title: 'Output device', hint: 'Where the sound plays.', noDescription: true, problem }));

describe('ItemList error', () => {
  it('shows a centred LoadError with the title in the sentence, the raw error behind Details and Retry from onRetry', () => {
    const html = list({ error: RAW, onRetry: noop });
    expect(html).toContain('<div class="load-error load-error--center">');
    expect(html).toContain('load-error__message">Could not load servers.</span>');
    expect(html).toContain(`load-error__raw" tabindex="0">${RAW}</pre>`);
    expect(html).toContain('retry-button load-error__retry');
    expect(list({ error: RAW })).not.toContain('retry-button');
  });
});

describe('SettingsRow problem', () => {
  it('keeps a plain problem as one red line', () => {
    const html = row('Pick a device that is plugged in.');
    expect(html).toMatch(/<small class="[^"]*settings-row__problem" role="alert"><svg/);
    expect(html).toContain('>Pick a device that is plugged in.</span></small>');
    expect(html).not.toContain('load-error');
  });

  it('draws a load problem as an inline LoadError', () => {
    const html = row({ message: 'Could not list the sound devices.', error: 'NotAllowedError', onRetry: noop });
    expect(html).toContain('<div class="load-error load-error--inline settings-row__load-problem">');
    expect(html).toContain('settings-row--problem');
    expect(html).toContain('NotAllowedError</pre>');
    expect(html).toContain('btn btn--ghost');
    expect(html).not.toContain('settings-row__problem"');
  });
});

describe('the parts that keep their own look', () => {
  it('puts the raw error of a Splash behind a ts-error Details', () => {
    const html = renderToString(h(SplashStage, { title: 'Archipelia', status: 'Failed', detail: 'Port taken.', error: 'EADDRINUSE', failed: true, meter: null }));
    expect(html).toContain('<p class="ts-detail">Port taken.</p><details class="ts-error"><summary>Details</summary><pre class="ts-error__text" tabindex="0">EADDRINUSE</pre></details>');
    expect(renderToString(h(SplashStage, { title: 'A', status: 'Loading', failed: false, meter: null }))).not.toContain('ts-error');
  });

  it('draws a UtilityScreen action marked retry as a RetryButton with its label', () => {
    const actions = [{ label: 'Later', tone: 'tertiary', onSelect: noop }, { label: 'Try again', tone: 'primary', retry: true, loading: true, onSelect: noop }];
    const html = renderToString(h(UtilityFooter, { actions }));
    expect(html).toMatch(/<button class="btn btn--tertiary[^"]*">(?:<[^>]+>)*Later/);
    expect(html).toMatch(/<span class="retry-button"><button class="btn btn--primary[^"]*btn--md[^"]*"[^>]*aria-busy="true"/);
    expect(html).toContain('Try again</span>');
  });

  it('offers Retry on a failed video with controls only', () => {
    const failed = { ...INITIAL_MEDIA, failed: true };
    const draw = (controls) => renderToString(h(VideoOverlay, { media: failed, controls, errorMessage: 'Could not play', onPlay: noop, onRetry: noop }));
    expect(draw(true)).toMatch(/Could not play<\/p><span class="retry-button">/);
    expect(draw(false)).not.toContain('retry-button');
  });

  it('folds each Referenced by group in a Disclosure', () => {
    const hits = [{ kind: 'preset', id: 'a', field: 'base', label: 'Keysanity' }, { kind: 'preset', id: 'b', field: 'base', label: 'Short' }];
    const html = renderToString(h(ReferencedBy, { hits }));
    expect(html).toContain('<details class="disclosure disclosure--md referenced-by__group">');
    expect(html).toContain('preset (2)</summary>');
    expect(html).not.toContain('aria-expanded');
  });
});
