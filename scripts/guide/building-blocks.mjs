/* @layer tooling-scripts @kind logic */
import { pageLink } from './page-link.mjs';
import { sentence } from './sentence.mjs';

const buildingBlocks = (components) => {
  const blocks = components.filter((c) => c.page && c.usage.buildingBlock === true);
  if (blocks.length === 0) return [];
  return [
    '## Building blocks\n',
    'No question leads to these parts. Other components are built on them; reach for one only when no component above fits.\n',
    `${blocks.map((c) => `- ${pageLink(c, 'components/')}. ${sentence(c.usage.job)}`).join('\n')}\n`,
  ];
};

export { buildingBlocks };
