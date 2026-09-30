/* @layer renderer-components @kind logic */
import type { BrandApp } from './brand.type';
import { BRAND_FAMILY } from './family.constants';
import type { IconArtFiles } from './icon-files.type';

const iconFiles = (app: BrandApp): IconArtFiles[] => {
  const { appIcon, mascot } = BRAND_FAMILY[app];
  const icon: IconArtFiles = { kind: 'icon', label: 'App icon', ladder: (size) => `${app}/icon/png/icon-${size}.png`, ico: `${app}/icon/icon.ico` };
  const mark: IconArtFiles = { kind: 'mark', label: 'Mark', ladder: (size) => `${app}/mark/mark-${size}.png`, ico: null };
  const first = mascot?.variants[0];
  const pet: IconArtFiles | null = mascot && first
    ? { kind: 'mascot', label: mascot.name, ladder: (size) => `${app}/mascot/${first.id}-${size}.png`, ico: `${app}/mascot/${first.id}.ico` }
    : null;
  return [appIcon ? icon : null, mark, pet].filter((files): files is IconArtFiles => files !== null);
};

export { iconFiles };
