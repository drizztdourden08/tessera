/* @layer tooling-scripts @kind test */
import { createElement as h } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it } from 'vitest';
import { SearchResultHit } from '../src/composites/SearchResultHit';
import { filterSettingsSections } from '../src/composites/SettingsSection';
import { compileTextSearch, foldText, matchParts, matchesText } from '../src/data';
import { HighlightedText } from '../src/primitives/listbox/HighlightedText';

const marked = (text, query) => matchParts(text, query).filter((part) => part.match).map((part) => part.text);

describe('foldText', () => {
  it('lowers the case and takes the accents off', () => {
    expect(foldText('Été à Montréal')).toBe('ete a montreal');
    expect(foldText('  Ça  ')).toBe('ca');
    expect(foldText('Straße')).toBe('straße');
  });

  it('folds a decomposed accent and keeps marks that are not accents', () => {
    expect(foldText('Cafe\u0301')).toBe('cafe');
    expect(foldText('a^b`c')).toBe('a^b`c');
  });
});

describe('matchesText', () => {
  it('matches every word anywhere, in any order, ignoring case and accents', () => {
    expect(matchesText('Dark theme mode', 'mode dark')).toBe(true);
    expect(matchesText('Créer un écran', 'ECRAN cree')).toBe(true);
    expect(matchesText('Cafe', 'café')).toBe(true);
    expect(matchesText('Dark theme', 'dark light')).toBe(false);
  });

  it('matches anything for an empty query', () => {
    expect(matchesText('anything', '')).toBe(true);
    expect(matchesText('anything', '   ')).toBe(true);
  });
});

describe('matchParts', () => {
  it('marks each word wherever it appears, in the text as written', () => {
    expect(matchParts('Résumé of the resume', 'resume')).toEqual([
      { text: 'Résumé', match: true },
      { text: ' of the ', match: false },
      { text: 'resume', match: true },
    ]);
    expect(marked('Dark theme mode', 'mode dark')).toEqual(['Dark', 'mode']);
  });

  it('joins overlapping words into one mark and keeps a decomposed accent inside it', () => {
    expect(marked('banana', 'ana nan')).toEqual(['anana']);
    expect(marked('Cafe\u0301 au lait', 'cafe')).toEqual(['Cafe\u0301']);
    expect(marked('\u{1F600} smile \u{1F600}', 'smile')).toEqual(['smile']);
  });

  it('gives the whole text unmarked when nothing matches or the query is empty', () => {
    expect(matchParts('Volume', '')).toEqual([{ text: 'Volume', match: false }]);
    expect(matchParts('Volume', 'zoom')).toEqual([{ text: 'Volume', match: false }]);
    expect(matchParts('', 'zoom')).toEqual([{ text: '', match: false }]);
  });
});

describe('compileTextSearch', () => {
  it('finds each word in any value of the row, nested values too', () => {
    const test = compileTextSearch('montreal ada');
    expect(test({ name: 'Ada', place: { city: 'Montréal' } })).toBe(true);
    expect(test({ name: 'Ada', place: { city: 'Laval' } })).toBe(false);
    expect(compileTextSearch('42')({ count: 1420 })).toBe(true);
    expect(compileTextSearch('  ')).toBeNull();
  });
});

describe('one matcher for every search', () => {
  it('filters settings rows by every word, ignoring accents', () => {
    const sections = [{ id: 'a', title: 'Audio', rows: [
      { id: 'v', title: 'Volume général', hint: 'Master' },
      { id: 'm', title: 'Micro', hint: 'Input' },
    ] }];
    const found = filterSettingsSections(sections, 'general volume');
    expect(found[0].groups[0].rows.map((row) => row.id)).toEqual(['v']);
  });

  it('draws the same marks in a list and in a search hit', () => {
    const list = renderToStaticMarkup(h(HighlightedText, { text: 'Résumé', query: 'resume' }));
    expect(list).toContain('>Résumé</mark>');
    const hit = renderToStaticMarkup(h(SearchResultHit, { label: 'Dark mode', query: 'mode dark' }));
    expect(hit.match(/search-result-hit__match/g)).toHaveLength(2);
  });
});
