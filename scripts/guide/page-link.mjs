/* @layer tooling-scripts @kind logic */
const pageLink = (component, base) => (component?.page ? `[${component.name}](${component.pageBase ?? base}${component.name}.md)` : `\`${component?.name}\``);

export { pageLink };
