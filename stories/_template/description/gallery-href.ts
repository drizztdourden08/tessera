/* @layer stories @kind logic */
import { GALLERY_ROUTE } from './description.constants';
import { galleryPageIndex } from './gallery-page-index';

const PAGES = galleryPageIndex(Object.keys(import.meta.glob('../../*/*.stories.tsx')));

const galleryHref = (path: string): string | null => {
  const id = PAGES.get(path);
  return id ? `${GALLERY_ROUTE}${id}` : null;
};

export { galleryHref };
