/* @layer stories @kind data */
const ICON_PNGS = import.meta.glob<string>(
  ['../../../brand/*/icon/png/*.png', '../../../brand/*/mark/*.png', '../../../brand/*/mascot/*.png'],
  { eager: true, query: '?url', import: 'default' },
);

const BRAND_FOLDER = '../../../brand/';

export { BRAND_FOLDER, ICON_PNGS };
