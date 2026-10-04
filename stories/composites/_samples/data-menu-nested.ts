/* @layer stories @kind data */
import type { MenuGroup, MenuItem } from '../../../src/composites/DropdownMenu';

const leaves = (prefix: string, labels: readonly string[]): MenuItem[] => labels.map((label) => ({ id: `${prefix}-${label.toLowerCase()}`, label }));

const IMAGE: MenuItem = {
  id: 'image',
  icon: 'image',
  label: 'Image',
  children: [...leaves('image', ['PNG', 'JPG', 'WebP']), { separator: true }, { id: 'image-alpha', label: 'Keep transparency', checked: true }],
};

const DOCUMENT: MenuItem = {
  id: 'document',
  icon: 'file-text',
  label: 'Document',
  children: [...leaves('doc', ['PDF', 'Markdown']), { id: 'doc-text', label: 'Plain text', children: leaves('text', ['UTF-8', 'ASCII']) }],
};

const NESTED_DEEP: MenuGroup[] = [{
  id: 'file',
  items: [
    { id: 'new', icon: 'plus', label: 'New', children: leaves('new', ['Profile', 'Session']) },
    { id: 'open', icon: 'folder-open', label: 'Open', shortcut: 'Ctrl+O' },
    { id: 'export', icon: 'download', label: 'Export', children: [IMAGE, DOCUMENT, { separator: true }, { id: 'export-copy', icon: 'copy', label: 'Copy to clipboard' }] },
    {
      id: 'share',
      icon: 'share-2',
      label: 'Share',
      children: [{ id: 'share-link', icon: 'link', label: 'Link', children: leaves('link', ['Copy link', 'Email it']) }, { id: 'share-mail', icon: 'mail', label: 'Send to a friend' }],
    },
    { separator: true },
    { id: 'quit', icon: 'log-out', label: 'Quit', shortcut: 'Ctrl+Q' },
  ],
}];

export { NESTED_DEEP };
