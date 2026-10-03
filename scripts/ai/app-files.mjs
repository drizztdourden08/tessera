/* @layer tooling-scripts @kind logic */
import { renderAppDecide } from './render-app-decide.mjs';
import { renderAppReadme } from './render-app-readme.mjs';
import { renderComponent } from './render-component.mjs';
import { renderIndex } from './render-index.mjs';
import { renderRegistry } from './render-registry.mjs';

const appFiles = (model) => {
  const dir = model.app.outDir;
  return {
    [`${dir}/README.md`]: renderAppReadme(model),
    [`${dir}/decide.md`]: renderAppDecide(model),
    [`${dir}/index.md`]: renderIndex(model),
    [`${dir}/registry.json`]: renderRegistry(model),
    ...Object.fromEntries(model.components.filter((c) => c.page).map((c) => [`${dir}/components/${c.name}.md`, renderComponent(model, c)])),
  };
};

export { appFiles };
