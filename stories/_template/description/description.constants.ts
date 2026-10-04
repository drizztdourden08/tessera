/* @layer stories @kind constants */
import type { DescriptionCheckMode } from './description.type';

const MARKUP_PIECE = new RegExp([
  '`(?<code>[^`]+)`',
  String.raw`\*\*(?<strong>.+?)\*\*`,
  String.raw`(?<![\w])_(?<em>[^_]+?)_(?![\w])`,
  String.raw`\[\[(?<keys>[^[\]]+)\]\]`,
  String.raw`\[(?<label>[^[\]]+)\]\((?<href>[^()\s]+)\)`,
  String.raw`\[(?<page>[A-Za-z][\w/]*)\]`,
].join('|'), 'g');

const SAFE_HREF = /^(?:#\/story\/|https:\/\/)/;

const GALLERY_ROUTE = '#/story/';

const LEAD_MAX = 140;

const POINT_MAX = 110;

const POINTS_MIN = 3;

const POINTS_MAX = 6;

const DESCRIPTION_CHECK: DescriptionCheckMode = 'report';

export { DESCRIPTION_CHECK, GALLERY_ROUTE, LEAD_MAX, MARKUP_PIECE, POINT_MAX, POINTS_MAX, POINTS_MIN, SAFE_HREF };
