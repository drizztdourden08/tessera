/* @layer renderer-components @kind types */
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
}

export type {
  DisplaySubstitution, IdRefDefaultResolver, IdRefDisplayResolver, IdRefTargetField, IdRefTargetFieldResolver,
};
