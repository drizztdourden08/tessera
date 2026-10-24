/* @layer stories @kind component */
import { BRAND_APPS, fileTypeFiles } from '../../../src/brand';
import { Icon } from '../../../src/primitives';
import { VariantGrid } from './VariantGrid';

const ITEMS = BRAND_APPS.flatMap(fileTypeFiles).map(({ type }) => ({
  key: type.ext,
  label: `${type.name}: ${type.icon}`,
  node: <Icon name={type.icon} size={48} />,
}));

const FileTypeGlyphs = () => <VariantGrid items={ITEMS} />;

export { FileTypeGlyphs };
