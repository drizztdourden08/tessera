/* @layer tooling-scripts @kind entry */
import path from 'node:path';
import { runnerImport } from 'vite';
import { readStoryPages, storyFiles } from './read-story-pages.mjs';

const EMPTY_STYLE = '\0empty-style';
const emptyStyles = () => ({
  name: 'empty-styles',
  enforce: 'pre',
  resolveId: (id) => (id.endsWith('.css') ? EMPTY_STYLE : null),
  load: (id) => (id === EMPTY_STYLE ? '' : null),
});
const RUNNER = { configFile: false, logLevel: 'silent', plugins: [emptyStyles()] };
const MIN_PAGES = 150;

const root = process.cwd();
const stories = path.resolve(root, 'stories');
const load = async (file) => (await runnerImport(file, { ...RUNNER, root })).module;

const main = async () => {
  const [limits, index, text, markup] = await Promise.all([
    load('/stories/_template/description/description.constants.ts'),
    load('/stories/_template/description/gallery-page-index.ts'),
    load('/stories/_template/description/markup-text.ts'),
    load('/stories/_template/description/parse-markup.ts'),
  ]);
  const { DESCRIPTION_CHECK, LEAD_MAX, POINT_MAX, POINTS_MAX, POINTS_MIN } = limits;
  const files = storyFiles(stories);
  const pages = index.galleryPageIndex(files);

  const visible = (value) => text.markupText(markup.parseMarkup(value)).length;

  const missingPages = (texts) => texts.flatMap((value) => markup.parseMarkup(value))
    .filter((token) => token.kind === 'page' && !pages.get(token.path)).map((token) => `[${token.path}]`);

  const leadFindings = (lead) => {
    if (typeof lead !== 'string') return ['the lead is not a plain string the check can read'];
    return visible(lead) > LEAD_MAX ? [`lead ${visible(lead)} > ${LEAD_MAX}`] : [];
  };

  const pointFindings = (points) => {
    if (points === null || points.includes(null)) return ['points are not plain strings the check can read'];
    const count = points.length < POINTS_MIN || points.length > POINTS_MAX ? [`${points.length} points, want ${POINTS_MIN} to ${POINTS_MAX}`] : [];
    const long = points.map((point, position) => [position + 1, visible(point)]).filter(([, size]) => size > POINT_MAX)
      .map(([at, size]) => `point ${at} ${size} > ${POINT_MAX}`);
    return [...count, ...long];
  };

  const findingsOf = (page) => {
    const texts = [page.lead, ...(page.points ?? []), page.instead].filter((value) => typeof value === 'string');
    const missing = missingPages(texts);
    return [...leadFindings(page.lead), ...pointFindings(page.points), ...(missing.length > 0 ? [`no gallery page for ${missing.join(', ')}`] : [])];
  };

  const all = files.flatMap((file) => readStoryPages(stories, file));
  const problems = all.map((page) => ({ page, findings: findingsOf(page) })).filter((entry) => entry.findings.length > 0)
    .map(({ page, findings }) => `${page.file} (${page.name}): ${findings.join('; ')}`);
  if (all.length < MIN_PAGES) problems.push(`found only ${all.length} overview pages, want at least ${MIN_PAGES}`);
  problems.forEach((line) => console.log(line));
  console.log(problems.length === 0 ? `Overview descriptions: ${all.length} pages inside the limits.` : `Overview descriptions: ${problems.length} problems in ${all.length} pages.`);
  process.exitCode = problems.length > 0 && DESCRIPTION_CHECK === 'enforce' ? 1 : 0;
};

await main();
