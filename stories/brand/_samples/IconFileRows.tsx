/* @layer stories @kind component */
import { BRAND_APPS, iconFiles } from '../../../src/brand';
import { Demonstrator } from '../../_template/Demonstrator';
import { IconLadder } from './IconLadder';
import type { IconFileRowsProps } from './IconFileRows.type';

const IconFileRows = (props: IconFileRowsProps) => {
  const { pick, rims = ['none'] } = props;
  const ladders = rims.flatMap((rim) => BRAND_APPS.flatMap((app) => iconFiles(app, rim)
    .filter((files) => pick(app, files))
    .map((files) => ({
      key: `${rim}-${app}-${files.kind}`,
      label: `${app}, ${files.label.toLowerCase()}${rim === 'none' ? '' : `, ${rim} rim`}`,
      files,
    }))));
  return (
    <Demonstrator
      rows={ladders}
      cell={(key) => {
        const files = ladders.find((ladder) => ladder.key === key)?.files;
        return files && <IconLadder files={files} />;
      }}
    />
  );
};

export { IconFileRows };
