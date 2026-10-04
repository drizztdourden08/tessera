/* @layer tooling-scripts @kind logic */
import { COMPONENTS_DIR, FILES } from './guide.constants.mjs';
import { renderComponent } from './render-component.mjs';
import { renderDecide } from './render-decide.mjs';
import { renderIndex } from './render-index.mjs';
import { renderReadme } from './render-readme.mjs';
import { renderRegistry } from './render-registry.mjs';
import { renderRules } from './render-rules.mjs';

const guideFiles = (model) => ({
  [FILES.readme]: renderReadme(model),
  [FILES.rules]: renderRules(model),
  [FILES.decide]: renderDecide(model),
  [FILES.index]: renderIndex(model),
  [FILES.registry]: renderRegistry(model),
  ...Object.fromEntries(model.components.filter((c) => c.page).map((c) => [`${COMPONENTS_DIR}/${c.name}.md`, renderComponent(model, c)])),
});

export { guideFiles };
