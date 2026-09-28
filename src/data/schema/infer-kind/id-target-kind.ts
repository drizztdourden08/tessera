/* @layer renderer-components @kind logic */
import { present } from './present';

const idTargetKind = (values: readonly unknown[]): string | undefined => {
  const prefixes = new Set(
    present(values)
      .filter((v): v is string => typeof v === 'string')
      .map((v) => v.slice(0, v.lastIndexOf('-'))),
  );
  return prefixes.size === 1 ? [...prefixes][0] : undefined;
};

export { idTargetKind };
