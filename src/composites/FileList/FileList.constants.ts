/* @layer renderer-components @kind data */
import type { IconName } from '../../primitives/Icon';

const EXTENSION_ICONS: Readonly<Record<string, IconName>> = {
  '7z': 'archive', gz: 'archive', rar: 'archive', tar: 'archive', zip: 'archive',
  csv: 'file-text', json: 'file-text', log: 'file-text', md: 'file-text', toml: 'file-text', txt: 'file-text', yaml: 'file-text', yml: 'file-text',
  gif: 'image', jpeg: 'image', jpg: 'image', png: 'image', svg: 'image', webp: 'image',
  flac: 'headphones', mp3: 'headphones', ogg: 'headphones', wav: 'headphones',
};

const DEFAULT_FILE_ICON: IconName = 'file';

export { DEFAULT_FILE_ICON, EXTENSION_ICONS };
