/* @layer stories @kind component */
import { Field, Select, Toggle } from '../../../src/primitives';
import { versionGroups } from './update-versions';

interface UpdateSettingsProps {
  prereleases: boolean;
  onPrereleases: (on: boolean) => void;
  version: string;
  onVersion: (version: string) => void;
  disabled: boolean;
}

const UpdateSettings = (props: UpdateSettingsProps) => {
  const { prereleases, onPrereleases, version, onVersion, disabled } = props;
  return (
    <>
      <Toggle label="Include pre-releases" checked={prereleases} onChange={onPrereleases} disabled={disabled} />
      <Field label="Version to install">
        <Select value={version} onChange={onVersion} groups={versionGroups(prereleases)} disabled={disabled} />
      </Field>
    </>
  );
};

export { UpdateSettings };
