/* @layer tooling-scripts @kind logic */
const componentNames = (name) => {
  const kebab = name.replace(/([a-z0-9])([A-Z])/g, '$1-$2').replace(/([A-Z])([A-Z][a-z])/g, '$1-$2').toLowerCase();
  const words = kebab.split('-').join(' ');
  return { name, kebab, human: `${words.charAt(0).toUpperCase()}${words.slice(1)}`, props: `${name}Props` };
};

export { componentNames };
