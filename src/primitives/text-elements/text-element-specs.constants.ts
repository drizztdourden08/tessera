/* @layer renderer-components @kind constants */
import { ACCENT_TONES, QUIET_TONES, STATUS_TONES, TEXT_TONES } from '../TextElement/TextElement.constants';

const FREE_TEXT = ['weight', 'italic', 'opticalSize', 'features'] as const;
const NUMBERS = ['features'] as const;
const NONE = [] as const;
const MARKED = [...ACCENT_TONES, ...STATUS_TONES] as const;
const IMPORTANT = ['primary', ...STATUS_TONES] as const;

const TEXT_ELEMENT_SPECS = [
  { name: 'Paragraph', short: 'P', tag: 'p', looks: FREE_TEXT, tones: TEXT_TONES },
  { name: 'Span', short: 'Span', tag: 'span', looks: FREE_TEXT, tones: TEXT_TONES },
  { name: 'Strong', short: 'Strong', tag: 'strong', looks: NONE, tones: IMPORTANT },
  { name: 'Emphasis', short: 'Em', tag: 'em', looks: NONE, tones: NONE },
  { name: 'Bold', short: 'B', tag: 'b', looks: NONE, tones: ACCENT_TONES },
  { name: 'Italic', short: 'I', tag: 'i', looks: NONE, tones: NONE },
  { name: 'Underline', short: 'U', tag: 'u', looks: NONE, tones: NONE },
  { name: 'Strikethrough', short: 'S', tag: 's', looks: NONE, tones: NONE },
  { name: 'Deleted', short: 'Del', tag: 'del', looks: NONE, tones: NONE },
  { name: 'Inserted', short: 'Ins', tag: 'ins', looks: NONE, tones: NONE },
  { name: 'Highlight', short: 'Mark', tag: 'mark', looks: NONE, tones: MARKED },
  { name: 'Small', short: 'Small', tag: 'small', looks: NONE, tones: QUIET_TONES },
  { name: 'Subscript', short: 'Sub', tag: 'sub', looks: NONE, tones: NONE },
  { name: 'Superscript', short: 'Sup', tag: 'sup', looks: NONE, tones: NONE },
  { name: 'Code', short: 'Code', tag: 'code', looks: NONE, tones: NONE },
  { name: 'Keyboard', short: 'Kbd', tag: 'kbd', looks: NONE, tones: NONE },
  { name: 'Sample', short: 'Samp', tag: 'samp', looks: NONE, tones: STATUS_TONES },
  { name: 'Variable', short: 'Var', tag: 'var', looks: NONE, tones: NONE },
  { name: 'Abbreviation', short: 'Abbr', tag: 'abbr', looks: NONE, tones: NONE },
  { name: 'Citation', short: 'Cite', tag: 'cite', looks: NONE, tones: NONE },
  { name: 'Quote', short: 'Q', tag: 'q', looks: NONE, tones: NONE },
  { name: 'BlockQuote', short: 'Blockquote', tag: 'blockquote', looks: NONE, tones: MARKED },
  { name: 'Definition', short: 'Dfn', tag: 'dfn', looks: NONE, tones: NONE },
  { name: 'Time', short: 'Time', tag: 'time', looks: NUMBERS, tones: QUIET_TONES },
  { name: 'Data', short: 'Data', tag: 'data', looks: NUMBERS, tones: NONE },
  { name: 'Address', short: 'Address', tag: 'address', looks: NONE, tones: NONE },
  { name: 'Preformatted', short: 'Pre', tag: 'pre', looks: NONE, tones: NONE },
  { name: 'BidiIsolate', short: 'Bdi', tag: 'bdi', looks: NONE, tones: NONE },
  { name: 'BidiOverride', short: 'Bdo', tag: 'bdo', looks: NONE, tones: NONE },
  { name: 'Ruby', short: 'Ruby', tag: 'ruby', looks: NONE, tones: NONE },
  { name: 'RubyText', short: 'Rt', tag: 'rt', looks: NONE, tones: NONE },
  { name: 'RubyParenthesis', short: 'Rp', tag: 'rp', looks: NONE, tones: NONE },
] as const;

export { TEXT_ELEMENT_SPECS };
