/* @layer tooling-scripts @kind logic */
const USE_IT = {
  compound: (name) => `Import ${name} in the view that draws it and hand it its data by props.`,
  view: (name) => `Give ${name} its state from the app stores, then reach it from the app navigation.`,
  primitive: (name) => `Import ${name} where the app uses it. If another app ever needs it, move it to Tessera.`,
  composite: (name) => `Import ${name} where the app uses it. If another app ever needs it, move it to Tessera.`,
};

const nextSteps = (spec, plan) => {
  const { name } = spec.names;
  const story = plan.files.find((file) => file.path.endsWith('.stories.tsx'));
  return [
    `Write the props in ${spec.folder}/${name}.type.ts and draw them in ${name}.tsx.`,
    spec.mode === 'tessera'
      ? `Rewrite each sentence of ${name}.usage.ts, then run pnpm ai. When the props change, pnpm ai --check prints the new propsHash.`
      : `Rewrite each sentence of ${name}.usage.ts. When the props change, read it again and update propsHash.`,
    ...(story ? [`Fill the gallery page ${story.path} with the variants and states of ${name}.`] : []),
    ...(spec.mode === 'app' ? [USE_IT[spec.kind](name)] : []),
    spec.mode === 'tessera'
      ? 'Run pnpm lint, pnpm exec brock structure --check and pnpm test.'
      : 'Run the app lint and brock structure --check.',
  ].map((line, index) => `  ${index + 1}. ${line}`);
};

export { nextSteps };
