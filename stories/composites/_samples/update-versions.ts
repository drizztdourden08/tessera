/* @layer stories @kind data */
import type { SelectGroup } from '../../../src/primitives';

interface UpdateVersion {
  value: string;
  label: string;
  prerelease: boolean;
}

const UPDATE_VERSIONS: readonly UpdateVersion[] = [
  { value: '0.11.0-beta.2', label: '0.11.0-beta.2', prerelease: true },
  { value: '0.11.0-beta.1', label: '0.11.0-beta.1', prerelease: true },
  { value: '0.10.0', label: '0.10.0, newest', prerelease: false },
  { value: '0.9.2', label: '0.9.2, installed', prerelease: false },
  { value: '0.9.1', label: '0.9.1', prerelease: false },
  { value: '0.9.0', label: '0.9.0', prerelease: false },
];

const NEWEST_STABLE = '0.10.0';

const optionsOf = (prerelease: boolean) =>
  UPDATE_VERSIONS.filter((version) => version.prerelease === prerelease).map(({ value, label }) => ({ value, label }));

const versionGroups = (withPrereleases: boolean): SelectGroup[] => [
  ...(withPrereleases ? [{ label: 'Pre-releases', options: optionsOf(true) }] : []),
  { label: 'Stable', options: optionsOf(false) },
];

const isPrerelease = (value: string): boolean => UPDATE_VERSIONS.some((version) => version.value === value && version.prerelease);

export { isPrerelease, NEWEST_STABLE, versionGroups };
