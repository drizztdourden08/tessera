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
      ? `Rewrite each sentence of ${name}.usage.ts, then run pnpm guide. When the props change, pnpm guide --check prints the new propsHash.`
      : `Rewrite each sentence of ${name}.usage.ts, then run tessera check (brock tessera check in a Brock app). When the props change, it prints the new propsHash.`,
    ...(story ? [`Fill the gallery page ${story.path} with the variants and states of ${name}.`] : []),
    ...(spec.mode === 'app' ? [USE_IT[spec.kind](name)] : []),
    spec.mode === 'tessera'
      ? 'Run pnpm lint, pnpm exec standards structure --check and pnpm test.'
      : 'Run the app lint and standards structure --check (brock structure --check in a Brock app).',
  ].map((line, index) => `  ${index + 1}. ${line}`);
};

export { nextSteps };
