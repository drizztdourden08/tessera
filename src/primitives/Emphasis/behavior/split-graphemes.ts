/* @layer renderer-components @kind logic */
const segmenter = new Intl.Segmenter(undefined, { granularity: 'grapheme' });

const splitGraphemes = (text: string): string[] => Array.from(segmenter.segment(text), (part) => part.segment);

export { splitGraphemes };
