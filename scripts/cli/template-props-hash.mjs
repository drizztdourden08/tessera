/* @layer tooling-scripts @kind logic */
import { propsHash } from '../guide/props-hash.mjs';
import { TEMPLATE_PROPS } from './template.constants.mjs';

const templatePropsHash = () => propsHash({ own: TEMPLATE_PROPS, inherited: { from: [], extends: [] } });

export { templatePropsHash };
