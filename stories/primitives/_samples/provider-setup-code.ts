/* @layer stories @kind logic */
import { PROVIDER_PARTS } from './provider-part-text.constants';
import { providerSnippet } from './provider-snippet';
import { SETUP_IMPORTS, SETUP_RENDER } from './provider-snippets.constants';

const PROVIDER_SETUP_CODE = [SETUP_IMPORTS, ...providerSnippet(PROVIDER_PARTS), SETUP_RENDER].join('\n\n');

export { PROVIDER_SETUP_CODE };
