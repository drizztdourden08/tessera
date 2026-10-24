/* @layer stories @kind component */
import { BRAND_APPS, fileTypeFiles } from '../../../src/brand';
import { Demonstrator } from '../../_template/Demonstrator';
import { IconLadder } from './IconLadder';

const FILES = BRAND_APPS.flatMap(fileTypeFiles);

const ROWS = FILES.map((files) => ({ key: files.type.ext, label: files.label }));

const FileTypeRows = () => (
  <Demonstrator
    rows={ROWS}
    cell={(ext) => {
      const files = FILES.find((entry) => entry.type.ext === ext);
      return files && <IconLadder files={files} />;
    }}
  />
);

export { FileTypeRows };
