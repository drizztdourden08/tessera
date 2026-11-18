/* @layer renderer-components @kind logic */
const segmenters = new Map<string, Intl.Segmenter>();

const segmenterFor = (locale: string | undefined): Intl.Segmenter => {
  const key = locale ?? '';
  const found = segmenters.get(key);
  if (found) return found;
  const made = new Intl.Segmenter(locale, { granularity: 'grapheme' });
  segmenters.set(key, made);
  return made;
};

const splitGraphemes = (text: string, locale: string | undefined): string[] =>
  Array.from(segmenterFor(locale).segment(text), (part) => part.segment);

export { splitGraphemes };
