/* @layer root-config @kind logic */
import fs from 'node:fs';
import path from 'node:path';
import { CATALOGUE } from './catalogue.constants';
import { BANNER } from './home.constants';
import { storyFiles } from './story-files';
import { wordmarkSvg } from './wordmark-svg';

const countStories = (root: string): number =>
  storyFiles(path.join(root, 'stories'))
    .map((f) => /export \{([^}]+)\};\s*$/.exec(fs.readFileSync(f, 'utf8'))?.[1] ?? '')
    .reduce((n, list) => n + list.split(',').filter((s) => s.trim()).length, 0);

const buildHome = (root: string): string => {
  const components = CATALOGUE.flatMap((t) => t.groups.flatMap((g) => g.entries)).length;
  return [
    `<h1 class="home-title">${wordmarkSvg('tessera', '100%')}</h1>`,
    '',
    `The design system shared by Relic of the Past, Brock and Archipelia. ${components} components, ${countStories(root)} stories.`,
    '',
    '<div class="home-logo" data-tessera-logo></div>',
    '',
    BANNER,
    '',
    '## Finding your way',
    '',
    '- **The menu** on the left holds every component, tier by tier. The search box above it finds any story by name.',
    '- **The look buttons** at the top of the menu redraw every story as the Tessera greys, Relic of the Past or Archipelia.',
    '- **The controls panel** on the right of a story changes it live, when the story has controls.',
  ].join('\n');
};

export { buildHome };
