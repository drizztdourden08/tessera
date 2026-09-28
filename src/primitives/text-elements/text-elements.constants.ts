/* @layer renderer-components @kind constants */
import { TEXT_ELEMENT_SPECS } from './text-element-specs.constants';
import { textElementFor } from './text-element-for';
import type { TextMembers } from './text-elements.type';

const TEXT_MEMBERS = Object.fromEntries(TEXT_ELEMENT_SPECS.flatMap((spec) => {
  const element = textElementFor(spec.tag, spec.name);
  return [[spec.name, element], [spec.short, element]];
})) as TextMembers;

const Abbr = TEXT_MEMBERS.Abbr;
const Abbreviation = TEXT_MEMBERS.Abbreviation;
const Address = TEXT_MEMBERS.Address;
const B = TEXT_MEMBERS.B;
const Bdi = TEXT_MEMBERS.Bdi;
const Bdo = TEXT_MEMBERS.Bdo;
const BidiIsolate = TEXT_MEMBERS.BidiIsolate;
const BidiOverride = TEXT_MEMBERS.BidiOverride;
const BlockQuote = TEXT_MEMBERS.BlockQuote;
const Blockquote = TEXT_MEMBERS.Blockquote;
const Bold = TEXT_MEMBERS.Bold;
const Citation = TEXT_MEMBERS.Citation;
const Cite = TEXT_MEMBERS.Cite;
const Code = TEXT_MEMBERS.Code;
const Data = TEXT_MEMBERS.Data;
const Definition = TEXT_MEMBERS.Definition;
const Del = TEXT_MEMBERS.Del;
const Deleted = TEXT_MEMBERS.Deleted;
const Dfn = TEXT_MEMBERS.Dfn;
const Em = TEXT_MEMBERS.Em;
const Highlight = TEXT_MEMBERS.Highlight;
const I = TEXT_MEMBERS.I;
const Ins = TEXT_MEMBERS.Ins;
const Inserted = TEXT_MEMBERS.Inserted;
const Italic = TEXT_MEMBERS.Italic;
const Mark = TEXT_MEMBERS.Mark;
const P = TEXT_MEMBERS.P;
const Paragraph = TEXT_MEMBERS.Paragraph;
const Pre = TEXT_MEMBERS.Pre;
const Preformatted = TEXT_MEMBERS.Preformatted;
const Rp = TEXT_MEMBERS.Rp;
const Rt = TEXT_MEMBERS.Rt;
const Ruby = TEXT_MEMBERS.Ruby;
const RubyParenthesis = TEXT_MEMBERS.RubyParenthesis;
const RubyText = TEXT_MEMBERS.RubyText;
const S = TEXT_MEMBERS.S;
const Samp = TEXT_MEMBERS.Samp;
const Sample = TEXT_MEMBERS.Sample;
const Small = TEXT_MEMBERS.Small;
const Span = TEXT_MEMBERS.Span;
const Strikethrough = TEXT_MEMBERS.Strikethrough;
const Strong = TEXT_MEMBERS.Strong;
const Sub = TEXT_MEMBERS.Sub;
const Subscript = TEXT_MEMBERS.Subscript;
const Sup = TEXT_MEMBERS.Sup;
const Superscript = TEXT_MEMBERS.Superscript;
const Time = TEXT_MEMBERS.Time;
const U = TEXT_MEMBERS.U;
const Underline = TEXT_MEMBERS.Underline;
const Var = TEXT_MEMBERS.Var;
const Variable = TEXT_MEMBERS.Variable;

export {
  Abbr, Abbreviation, Address, B, Bdi, Bdo, BidiIsolate, BidiOverride, BlockQuote, Blockquote, Bold,
  Citation, Cite, Code, Data, Definition, Del, Deleted, Dfn, Em, Highlight, I, Ins, Inserted, Italic,
  Mark, P, Paragraph, Pre, Preformatted, Rp, Rt, Ruby, RubyParenthesis,
  RubyText, S, Samp, Sample, Small, Span, Strikethrough, Strong, Sub, Subscript, Sup, Superscript,
  TEXT_MEMBERS, Time, U, Underline, Var, Variable,
};
