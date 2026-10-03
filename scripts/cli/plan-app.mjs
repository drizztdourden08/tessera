/* @layer tooling-scripts @kind logic */
import { componentFiles } from './component-files.mjs';
import { APP_TIERS } from './new.constants.mjs';
import { storySource } from './story-source.mjs';

const planApp = (spec) => {
  const { kind, names, group, storyDir } = spec;
  const storyTitle = `${APP_TIERS[kind]}${group ? ` · ${group}` : ''}/${names.name}`;
  const story = spec.story ? [{ path: `${storyDir}/${names.name}.stories.tsx`, content: storySource({ ...spec, storyTitle }) }] : [];
  return { files: [...componentFiles(spec), ...story], edits: [], problems: [] };
};

export { planApp };
