/* @layer tooling-scripts @kind test */
import fs from 'node:fs';
import path from 'node:path';
import ts from 'typescript';
import { describe, expect, it } from 'vitest';
import {
  DESCRIPTION_CHECK, LEAD_MAX, POINT_MAX, POINTS_MAX, POINTS_MIN,
} from '../stories/_template/description/description.constants';
import { galleryPageIndex } from '../stories/_template/description/gallery-page-index';
import { markupText } from '../stories/_template/description/markup-text';
import { parseMarkup } from '../stories/_template/description/parse-markup';

const STORIES = path.resolve('stories');
const PAGE_CALLS = new Set(['overviewStory', 'textElementStories', 'scaleStories']);
const REFERENCES = ['primitives/Button.stories.tsx', 'composites/DataTable.stories.tsx', 'composites/SettingsRow.stories.tsx'];

const storyFiles = () => fs.readdirSync(STORIES, { withFileTypes: true })
  .filter((entry) => entry.isDirectory())
  .flatMap((dir) => fs.readdirSync(path.join(STORIES, dir.name)).filter((file) => file.endsWith('.stories.tsx')).map((file) => `${dir.name}/${file}`));

const PAGES = galleryPageIndex(storyFiles());

const topConstants = (source) => new Map(source.statements.filter(ts.isVariableStatement)
  .flatMap((statement) => statement.declarationList.declarations)
  .filter((declaration) => ts.isIdentifier(declaration.name) && declaration.initializer)
  .map((declaration) => [declaration.name.text, declaration.initializer]));

const unwrap = (node) => (node && (ts.isAsExpression(node) || ts.isSatisfiesExpression(node)) ? unwrap(node.expression) : node);

const stringOf = (raw, constants) => {
  const node = unwrap(raw);
  if (node === undefined) return undefined;
  if (ts.isStringLiteral(node) || ts.isNoSubstitutionTemplateLiteral(node)) return node.text;
  if (ts.isIdentifier(node) && constants.has(node.text)) return stringOf(constants.get(node.text), constants);
  return null;
};

const listOf = (raw, constants) => {
  const node = unwrap(raw);
  if (node === undefined) return [];
  if (ts.isIdentifier(node) && constants.has(node.text)) return listOf(constants.get(node.text), constants);
  if (!ts.isArrayLiteralExpression(node)) return null;
  return node.elements.map((element) => stringOf(element, constants));
};

const propertiesOf = (object) => new Map(object.properties
  .filter((property) => ts.isPropertyAssignment(property) || ts.isShorthandPropertyAssignment(property))
  .map((property) => [property.name.text, ts.isShorthandPropertyAssignment(property) ? property.name : property.initializer]));

const pageCalls = (source) => {
  const calls = [];
  const visit = (node) => {
    if (ts.isCallExpression(node) && ts.isIdentifier(node.expression) && PAGE_CALLS.has(node.expression.text)
      && node.arguments[0] && ts.isObjectLiteralExpression(node.arguments[0])) calls.push(node.arguments[0]);
    ts.forEachChild(node, visit);
  };
  visit(source);
  return calls;
};

const readPages = (file) => {
  const source = ts.createSourceFile(file, fs.readFileSync(path.join(STORIES, file), 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
  const constants = topConstants(source);
  return pageCalls(source).map((call) => {
    const props = propertiesOf(call);
    return {
      file,
      name: stringOf(props.get('component') ?? props.get('name'), constants) ?? path.basename(file, '.stories.tsx'),
      lead: stringOf(props.get('description'), constants),
      points: listOf(props.get('points'), constants),
      instead: stringOf(props.get('instead'), constants),
    };
  });
};

const visible = (text) => markupText(parseMarkup(text)).length;

const missingPages = (texts) => texts.flatMap((text) => parseMarkup(text))
  .filter((token) => token.kind === 'page' && !PAGES.get(token.path)).map((token) => `[${token.path}]`);

const leadFindings = (lead) => {
  if (typeof lead !== 'string') return ['the lead is not a plain string the check can read'];
  return visible(lead) > LEAD_MAX ? [`lead ${visible(lead)} > ${LEAD_MAX}`] : [];
};

const pointFindings = (points) => {
  if (points === null || points.includes(null)) return ['points are not plain strings the check can read'];
  const count = points.length < POINTS_MIN || points.length > POINTS_MAX ? [`${points.length} points, want ${POINTS_MIN} to ${POINTS_MAX}`] : [];
  const long = points.map((point, index) => [index + 1, visible(point)]).filter(([, size]) => size > POINT_MAX)
    .map(([at, size]) => `point ${at} ${size} > ${POINT_MAX}`);
  return [...count, ...long];
};

const findingsOf = (page) => {
  const texts = [page.lead, ...(page.points ?? []), page.instead].filter((text) => typeof text === 'string');
  const missing = missingPages(texts);
  return [...leadFindings(page.lead), ...pointFindings(page.points), ...(missing.length > 0 ? [`no gallery page for ${missing.join(', ')}`] : [])];
};

const PAGE_LIST = storyFiles().flatMap(readPages).map((page) => ({ ...page, findings: findingsOf(page) }));

describe('Overview descriptions', () => {
  it('finds the pages to check', () => {
    expect(PAGE_LIST.length).toBeGreaterThan(150);
  });

  it('keeps the reference pages inside the limits', () => {
    const references = PAGE_LIST.filter((page) => REFERENCES.includes(page.file));
    expect(references).toHaveLength(REFERENCES.length);
    expect(references.flatMap((page) => page.findings)).toEqual([]);
  });

  it(`lists the pages over the limits (${DESCRIPTION_CHECK} mode)`, () => {
    const over = PAGE_LIST.filter((page) => page.findings.length > 0);
    const lines = over.map((page) => `  ${page.file} (${page.name}): ${page.findings.join('; ')}`);
    console.info([`Overview descriptions: ${over.length} of ${PAGE_LIST.length} pages need work`, ...lines].join('\n'));
    if (DESCRIPTION_CHECK === 'enforce') expect(lines).toEqual([]);
  });
});
