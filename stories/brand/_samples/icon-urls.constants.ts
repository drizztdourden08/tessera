/* @layer stories @kind data */
const ICON_URLS = import.meta.glob<string>(
  [
    '../../../brand/*/icon/png/*.png', '../../../brand/*/mark/*.png', '../../../brand/*/mascot/*.png', '../../../brand/*/*/*.ico',
    '../../../brand/*/filetypes/*/png/*.png', '../../../brand/*/filetypes/*/icon.ico',
    '../../../brand/light-rim/*/icon/png/*.png', '../../../brand/light-rim/*/mark/*.png', '../../../brand/light-rim/*/*/*.ico',
  ],
  { eager: true, query: '?url', import: 'default' },
);

const BRAND_FOLDER = '../../../brand/';

export { BRAND_FOLDER, ICON_URLS };
