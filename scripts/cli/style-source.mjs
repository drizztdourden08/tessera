/* @layer tooling-scripts @kind logic */
const styleSource = ({ layer, names }) => `/* @layer ${layer} @kind style */
.${names.kebab} {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.${names.kebab}__title {
  color: var(--c-text-dim);
}
`;

export { styleSource };
