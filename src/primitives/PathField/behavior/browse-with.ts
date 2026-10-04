/* @layer renderer-components @kind util */
import type { PathBrowse } from '../PathField.type';

const browseWith = (onBrowse: PathBrowse, onChange: (path: string) => void) => () => {
  void Promise.resolve(onBrowse()).then((picked) => {
    if (typeof picked === 'string') onChange(picked);
  });
};

export { browseWith };
