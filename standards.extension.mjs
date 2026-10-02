/* @layer root-config @kind config */
import { tesseraExtension } from './scripts/standards/tessera-extension.mjs';

const extension = tesseraExtension(process.cwd());

export { extension };
