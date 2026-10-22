/* @layer tooling-scripts @kind logic */
import { placeholderSentences } from '../guide/placeholder-sentences.mjs';
import { addBarrelExport } from './add-barrel-export.mjs';
import { addCatalogueEntry } from './add-catalogue-entry.mjs';
import { addSidebarIcon } from './add-sidebar-icon.mjs';
import { componentFiles } from './component-files.mjs';
import { editFile } from './edit-file.mjs';
import { SIDEBAR_FILE } from './new.constants.mjs';
import { storySource } from './story-source.mjs';

const planTessera = (root, spec) => {
  const { names, group, tier, icon, kindDir, storyDir, catalogueFile } = spec;
  const storyTitle = `${tier} · ${group}/${names.name}`;
  const results = [
    editFile(root, `${kindDir}/index.ts`, (text) => addBarrelExport(text, names)),
    editFile(root, catalogueFile, (text) => addCatalogueEntry(text, group, { name: names.name, summary: placeholderSentences(names.name).job })),
    editFile(root, SIDEBAR_FILE, (text) => addSidebarIcon(text, `${tier} · ${group}`, names.name, icon)),
  ];
  return {
    files: [
      ...componentFiles(spec),
      { path: `${storyDir}/${names.name}.stories.tsx`, content: storySource({ ...spec, storyTitle }) },
    ],
    edits: results.flatMap((result) => result.edit ?? []),
    problems: results.flatMap((result) => result.problem ?? []),
  };
};

export { planTessera };
