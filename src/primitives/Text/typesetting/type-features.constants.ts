/* @layer renderer-components @kind data */
import type { TypeFeatureGroup, TypeFeatureInfo } from './type-features.type';

const TYPE_FEATURES = {
  tabularNumbers: { tag: 'tnum', label: 'Tabular figures', group: 'numerals', sample: '1111 7788 4.10' },
  proportionalNumbers: { tag: 'pnum', label: 'Proportional figures', group: 'numerals', sample: '1111 7788 4.10' },
  slashedZero: { tag: 'zero', label: 'Slashed zero', group: 'numerals', sample: '0O 10:00 2009' },
  fractions: { tag: 'frac', label: 'Fractions', group: 'numerals', sample: '1/2 3/4 7/16' },
  numerators: { tag: 'numr', label: 'Numerators', group: 'position', sample: '0123456789' },
  denominators: { tag: 'dnom', label: 'Denominators', group: 'position', sample: '0123456789' },
  superscript: { tag: 'sups', label: 'Superscript', group: 'position', sample: '0123456789' },
  subscript: { tag: 'subs', label: 'Subscript', group: 'position', sample: '0123456789' },
  scientificInferiors: { tag: 'sinf', label: 'Scientific inferiors', group: 'position', sample: '0123456789' },
  ordinals: { tag: 'ordn', label: 'Ordinals', group: 'position', sample: '1a 2o No 3rd' },
  caseForms: { tag: 'case', label: 'Case-sensitive forms', group: 'forms', sample: '(HOOK-SHOT) [A] {B} @X' },
  capitalSpacing: { tag: 'cpsp', label: 'Capital spacing', group: 'forms', sample: 'HYRULE CASTLE' },
  contextualAlternates: { tag: 'calt', label: 'Contextual alternates', group: 'forms', sample: '-> <- => 10x10' },
  discretionaryLigatures: { tag: 'dlig', label: 'Discretionary ligatures', group: 'forms', sample: '!= <= >= -> <->' },
  openDigits: { tag: 'ss01', label: 'Open digits', group: 'stylistic', sample: '1234567890' },
  disambiguation: { tag: 'ss02', label: 'Disambiguation', group: 'stylistic', sample: 'Il1 O0 rn m' },
  roundQuotes: { tag: 'ss03', label: 'Round quotes & commas', group: 'stylistic', sample: '"Hey," it\'s me.' },
  disambiguationNoZero: { tag: 'ss04', label: 'Disambiguation (no slashed zero)', group: 'stylistic', sample: 'Il1 O0 rn m' },
  circled: { tag: 'ss05', label: 'Circled characters', group: 'stylistic', sample: '1 2 3 A B C' },
  squared: { tag: 'ss06', label: 'Squared characters', group: 'stylistic', sample: '1 2 3 A B C' },
  squarePunctuation: { tag: 'ss07', label: 'Square punctuation', group: 'stylistic', sample: 'Wait. What? Yes; now: go.' },
  squareQuotes: { tag: 'ss08', label: 'Square quotes', group: 'stylistic', sample: '"Hey," it\'s me.' },
  alternateOne: { tag: 'cv01', label: 'Alternate one', group: 'character', sample: '1 11 101' },
  openFour: { tag: 'cv02', label: 'Open four', group: 'character', sample: '4 44 404' },
  openSix: { tag: 'cv03', label: 'Open six', group: 'character', sample: '6 66 606' },
  openNine: { tag: 'cv04', label: 'Open nine', group: 'character', sample: '9 99 909' },
  tailedL: { tag: 'cv05', label: 'Lower-case L with tail', group: 'character', sample: 'll illegal' },
  simplifiedU: { tag: 'cv06', label: 'Simplified u', group: 'character', sample: 'u hub pulse' },
  alternateSharpS: { tag: 'cv07', label: 'Alternate sharp s', group: 'character', sample: 'ß Straße' },
  serifI: { tag: 'cv08', label: 'Upper-case i with serif', group: 'character', sample: 'I Illusion' },
  flatTopThree: { tag: 'cv09', label: 'Flat-top three', group: 'character', sample: '3 33 303' },
  spurG: { tag: 'cv10', label: 'Capital G with spur', group: 'character', sample: 'G GANON' },
  singleStoryA: { tag: 'cv11', label: 'Single-story a', group: 'character', sample: 'a banana' },
  compactF: { tag: 'cv12', label: 'Compact f', group: 'character', sample: 'f fluffy' },
  compactT: { tag: 'cv13', label: 'Compact t', group: 'character', sample: 't tattoo' },
  alternateCapitalSharpS: { tag: 'cv14', label: 'Alternate capital sharp S', group: 'character', sample: 'ẞ STRAẞE' },
} satisfies Record<string, TypeFeatureInfo>;

const TYPE_FEATURE_GROUPS: readonly TypeFeatureGroup[] = ['numerals', 'position', 'forms', 'stylistic', 'character'];

export { TYPE_FEATURE_GROUPS, TYPE_FEATURES };
