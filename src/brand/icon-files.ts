/* @layer renderer-components @kind logic */
import type { BrandApp } from './brand.type';
import { BRAND_FAMILY } from './family.constants';
import type { IconArtFiles } from './icon-files.type';
import type { BrandRim } from './rim.type';

const iconFiles = (app: BrandApp, rim: BrandRim = 'none'): IconArtFiles[] => {
  const { appIcon, mascot } = BRAND_FAMILY[app];
  const dir = rim === 'none' ? app : `${rim}-rim/${app}`;
  const icon: IconArtFiles = { kind: 'icon', label: 'App icon', ladder: (size) => `${dir}/icon/png/icon-${size}.png`, ico: `${dir}/icon/icon.ico` };
  const mark: IconArtFiles = { kind: 'mark', label: 'Mark', ladder: (size) => `${dir}/mark/mark-${size}.png`, ico: appIcon ? null : `${dir}/mark/mark.ico` };
  const first = rim === 'none' ? mascot?.variants[0] : undefined;
  const pet: IconArtFiles | null = mascot && first
    ? { kind: 'mascot', label: mascot.name, ladder: (size) => `${app}/mascot/${first.id}-${size}.png`, ico: `${app}/mascot/${first.id}.ico` }
    : null;
  return [appIcon ? icon : null, mark, pet].filter((files): files is IconArtFiles => files !== null);
};

export { iconFiles };
