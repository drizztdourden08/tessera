/* @layer renderer-components @kind logic */
import type { FieldDescriptor } from './field-descriptor';
import { enumOptions, idTargetKind, inferKind, isPlainObject } from './infer-kind';
import { MAX_DEPTH } from './derive-fields.constants';
import { labelFor } from './label-for';
import type { DeriveContext, FieldSample } from './derive-fields.type';

const keysInOrder = (samples: readonly unknown[]): readonly string[] => {
  const keys = new Set<string>();
  for (const sample of samples) {
    if (isPlainObject(sample)) for (const key of Object.keys(sample)) keys.add(key);
  }
  return [...keys];
};

const childPath = (prefix: string, key: string): string => (prefix ? `${prefix}.${key}` : key);

const describe = (sample: FieldSample, ctx: DeriveContext, depth: number): FieldDescriptor => {
  const { path, label, values, optional } = sample;
  const kind = ctx.kinds?.[path] ?? inferKind(values, ctx.idPattern);
  const field: FieldDescriptor = { path, label, kind, optional };
  if (kind === 'enum') field.options = enumOptions(values);
  if (kind === 'idRef') field.targetKind = idTargetKind(values);
  if (depth >= MAX_DEPTH) return field;
  if (kind === 'array') {
    const elements = values.flatMap((v) => (Array.isArray(v) ? (v as unknown[]) : []));
    field.of = describe(
      { path: `${path}[]`, label: `${label} item`, values: elements, optional: false },
      ctx,
      depth + 1,
    );
  }
  if (kind === 'object' || kind === 'union') {
    field.children = deriveFields(values.filter(isPlainObject), path, ctx, depth + 1);
  }
  return field;
};

const deriveFields = (
  samples: readonly unknown[],
  prefix: string,
  ctx: DeriveContext,
  depth: number,
): readonly FieldDescriptor[] =>
  keysInOrder(samples).map((key) => {
    const values = samples.map((s) => (isPlainObject(s) ? s[key] : undefined));
    const optional = values.some((v) => v === undefined);
    return describe({ path: childPath(prefix, key), label: labelFor(key), values, optional }, ctx, depth);
  });

const deriveSchema = (rows: readonly unknown[], ctx: DeriveContext): readonly FieldDescriptor[] =>
  deriveFields(rows, '', ctx, 0);

export { deriveSchema };
