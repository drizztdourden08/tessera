/* @layer renderer-components @kind types */
import type { IdRefHrefResolver } from '../../field-kits/registry.type';

interface IdRefTargetField {
  path: string;
  label: string;
}

type IdRefTargetFieldResolver = (targetKind: string) => readonly IdRefTargetField[];

type IdRefDisplayResolver = (
  targetKind: string,
  id: string,
  displayField: string,
) => string | undefined;

type IdRefDefaultResolver = (id: string, targetKind?: string) => string | undefined;

interface DisplaySubstitution {
  displayField?: string;
  resolve?: IdRefDisplayResolver;
  resolveDefault?: IdRefDefaultResolver;
  resolveHref?: IdRefHrefResolver;
}

export type {
  DisplaySubstitution, IdRefDefaultResolver, IdRefDisplayResolver, IdRefHrefResolver, IdRefTargetField, IdRefTargetFieldResolver,
};
