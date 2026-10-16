/* @layer tooling-scripts @kind logic */
import { createRequire } from 'node:module';
import { join } from 'node:path';

const loadPlaywright = (root, check) => {
  const from = process.env.PLAYWRIGHT_MODULE;
  try {
    return from ? createRequire(import.meta.url)(from) : createRequire(join(root, 'package.json'))('playwright');
  } catch {
    console.error(`${check} needs Playwright. Set PLAYWRIGHT_MODULE to the path of an installed playwright package.`);
    return process.exit(2);
  }
};

export { loadPlaywright };
